import express from "express";
import bcrypt from "bcrypt";
import { Admin, Order, Password, User } from "./db.js";
import { authenticateToken, adminAuthMiddleware } from "./middleware.js";
import { generatePassword } from "./utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendOtp, verifyOtp } from "./otpService.js";

const { JWT_SECRET } = process.env;
export const router = express.Router();

router.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

router.post("/user/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "User registration failed. Username or email might already exist.",
    });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = password === admin.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "30d" });
    res.json({
      success: true,
      _id: admin._id,
      username: admin.username,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Username doesn't exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid username or password" });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/user/password", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/verify-login", authenticateToken, async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ verified: true });
    } else {
      res.status(401).json({ verified: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/passwords", authenticateToken, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.userId });
    res.status(200).json(passwords);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/passwords", authenticateToken, async (req, res) => {
  const { website, password } = req.body;

  try {
    const newPassword = new Password({
      website,
      password,
      userId: req.userId,
    });
    await newPassword.save();
    res.status(200).json({ message: "Password saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "This website and it's corresponding password already exists",
    });
  }
});

router.put("/passwords/:id", authenticateToken, async (req, res) => {
  const { loginPassword } = req.body;

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(loginPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Incorrect login password" });
  }

  const newPassword = generatePassword();
  await Password.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { password: newPassword }
  );
  res.json({
    message: "Password regenerated successfully",
  });
});

router.delete("/passwords/:id", authenticateToken, async (req, res) => {
  try {
    await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    res.json({ message: "Password deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username" });
    }
    const result = await sendOtp(user);
    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/verify-otp", (req, res) => {
  try {
    const { username, otp } = req.body;

    if (!username || !otp) {
      return res
        .status(400)
        .json({ success: false, error: "Email and OTP are required" });
    }

    const result = verifyOtp(username, otp);
    if (result.error) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/order/create", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      address,
      machineType,
      brand,
      fabric,
      color,
      quantity,
      diameter,
      amount,
    } = req.body;
    const userId = req.userId;
    const newOrder = new Order({
      user: userId,
      name,
      address,
      machineType,
      brand,
      fabric,
      color,
      quantity,
      diameter,
      amount,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({
      savedOrder,
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

router.get("/order/user", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/admin/orders", adminAuthMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/admin/orders/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("user", "username email");

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      mobile: user.mobile || "",
      address: user.address || "",
    });
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/user/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email, mobile, address } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ message: "Username and email are required" });
    }

    const existingUsername = await User.findOne({
      username,
      _id: { $ne: userId },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    if (mobile) {
      const existingMobile = await User.findOne({
        mobile,
        _id: { $ne: userId },
      });

      if (existingMobile) {
        return res
          .status(400)
          .json({ message: "Mobile number is already registered" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, mobile, address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
      mobile: updatedUser.mobile || "",
      address: updatedUser.address || "",
    });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
