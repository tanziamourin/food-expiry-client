import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle"; // adjust path as needed

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout().catch((err) => console.error(err));
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
      >
        Home
      </NavLink>
      <NavLink
        to="/fridge"
        className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
      >
        Fridge
      </NavLink>
      {!user && (
        <>
          <NavLink
            to="/login"
            className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
          >
            Register
          </NavLink>
        </>
      )}
      {user && (
        <>
          <NavLink
            to="/add-food"
            className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
          >
            Add Food
          </NavLink>
          <NavLink
            to="/my-items"
            className="block md:inline px-4 py-2 font-medium text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white rounded transition-all duration-300"
          >
            My Items
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-green-500 tracking-wide dark:text-green-400"
        >
          🍃 FoodTrack
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks}
          <ThemeToggle />
          {user && (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
                />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block text-sm bg-gray-800 text-white px-3 py-1 rounded shadow-lg">
                  {user.displayName}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 font-semibold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-green-500 dark:text-green-300">
            Menu
          </h2>
          <button onClick={toggleMenu} aria-label="Close Menu">
            <FaTimes size={22} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="px-4 py-4 space-y-3">{navLinks}</div>

        {/* Theme Toggle & User Info */}
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <ThemeToggle></ThemeToggle>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold dark:text-white">
                {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
