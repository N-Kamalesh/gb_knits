import { useState, useEffect } from "react";
import { User, Edit, Save, X } from "lucide-react";

const { VITE_API_URL } = import.meta.env;

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${VITE_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (data.message) {
          throw new Error(data.message);
        }

        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${VITE_API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data.message) {
        throw new Error(data.message);
      }
      setUser(data);
      setEditMode(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    // Clear any previous error messages
    setError(null);
    setSuccessMessage("");
  };

  if (loading && !user.username) {
    return (
      <div className="mt-24 flex min-h-screen items-center justify-center">
        <div className="p-8 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-b-blue-500 border-l-transparent border-r-transparent border-t-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <div className="bg-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">User Profile</h1>
            {!editMode ? (
              <button
                onClick={toggleEditMode}
                className="flex items-center space-x-1 rounded-md bg-blue-700 px-3 py-1 text-white transition hover:bg-blue-800"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                className="flex items-center space-x-1 rounded-md bg-gray-600 px-3 py-1 text-white transition hover:bg-gray-700"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>

        {error && (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {successMessage && (
          <div
            className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="p-6">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <User size={48} className="text-gray-800" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username field */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full rounded-md border px-3 py-2 ${
                  editMode
                    ? "border-gray-300 bg-white"
                    : "border-transparent bg-gray-100"
                }`}
              />
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full rounded-md border px-3 py-2 ${
                  editMode
                    ? "border-gray-300 bg-white"
                    : "border-transparent bg-gray-100"
                }`}
              />
            </div>

            {/* Mobile field */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="mobile"
              >
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={user.mobile}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full rounded-md border px-3 py-2 ${
                  editMode
                    ? "border-gray-300 bg-white"
                    : "border-transparent bg-gray-100"
                }`}
              />
            </div>

            {/* Address field */}
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                disabled={!editMode}
                rows="3"
                className={`w-full rounded-md border px-3 py-2 ${
                  editMode
                    ? "border-gray-300 bg-white"
                    : "border-transparent bg-gray-100"
                }`}
              ></textarea>
            </div>

            {editMode && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-1 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-l-transparent border-r-transparent border-t-white"></div>
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
