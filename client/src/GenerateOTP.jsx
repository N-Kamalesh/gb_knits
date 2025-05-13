import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

function GenerateOTP() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("username");
  const navigate = useNavigate();

  async function getOtp() {
    try {
      const response = await fetch(`${VITE_API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert("OTP Sent");
        setMode("otp");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function checkOtp() {
    try {
      const response = await fetch(`${VITE_API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert("OTP Verified");
        setMode("password");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function changePassword() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${VITE_API_URL}/user/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Password Changed");
        setMode("username");
        navigate("/login");
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className="flex h-screen  bg-white dark:bg-gray-900">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center border-r bg-gray-100 dark:bg-gray-800">
        <img
          src="https://images.pexels.com/photos/4475702/pexels-photo-4475702.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600"
          alt="Security"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-white">
              Forgot Password
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Recover your account in 3 steps
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between text-sm font-semibold mb-4">
            {["username", "otp", "password"].map((step) => (
              <div
                key={step}
                className={`w-1/3 text-center py-2 rounded-md ${
                  mode === step ? "bg-blue-600 text-white" : "text-blue-600"
                }`}
              >
                {step.toUpperCase()}
              </div>
            ))}
          </div>

          {/* Step: Username */}
          {mode === "username" && (
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}

          {/* Step: OTP */}
          {mode === "otp" && (
            <div>
              <label className="block mb-1 font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
              />
            </div>
          )}

          {/* Step: Password Reset */}
          {mode === "password" && (
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New password"
              />
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={
              mode === "username"
                ? getOtp
                : mode === "otp"
                ? checkOtp
                : changePassword
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            {mode === "username"
              ? "Send OTP"
              : mode === "otp"
              ? "Verify OTP"
              : "Change Password"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default GenerateOTP;
