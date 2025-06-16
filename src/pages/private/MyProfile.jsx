import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { HiLogout } from "react-icons/hi";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase.config";

const MyProfile = () => {
  useEffect(() => {
    document.title = "My Profile | FoodTrack";
  }, []);

  const { user, logout, refreshUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [errors, setErrors] = useState({}); // validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!photoURL.trim()) errs.photoURL = "Photo URL is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refreshUser();
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
        <p className="text-base">Please log in to view your profile.</p>
        <Link to="/login" className="mt-4 inline-block text-pink-600 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-white dark:bg-gray-900 p-10 shadow-xl rounded-2xl transition duration-300">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition">
          Welcome, {user.displayName || "User"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your personal profile</p>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL || "/default-user.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-green-300 shadow-md object-cover transition duration-300"
        />

        {!isEditing ? (
          <>
            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
              {user.displayName || "No Name"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 bg-green-500 hover:bg-green-800 text-white rounded-md shadow transition-all duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow flex items-center gap-1 transition-all duration-200"
              >
                <HiLogout /> Logout
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleUpdateProfile}
            className="w-full mt-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-5 transition-all duration-300"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500" : "focus:ring-pink-400"
                } transition`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.photoURL ? "border-yellow-200" : "focus:ring-green-400"
                } transition`}
              />
              {errors.photoURL && (
                <p className="text-red-500 text-xs mt-1">{errors.photoURL}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
