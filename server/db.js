import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  mobile: { type: String, unique: true },
});

export const User = model("User", userSchema);

const passwordSchema = new Schema({
  website: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
passwordSchema.index({ website: 1, userId: 1 }, { unique: true });

export const Password = model("Password", passwordSchema);

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  machineType: { type: String, required: true },
  brand: { type: String, required: true },
  fabric: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  diameter: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model("Order", orderSchema);

const adminSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const Admin = model("Admin", adminSchema);
