import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout().catch(console.error);
    setDropdownOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const baseLinkClasses =
    "block md:inline px-4 py-2 font-medium rounded transition-all duration-300";
  const activeLinkClasses =
    "bg-gradient-to-r from-green-400 to-lime-500 text-white";
  const inactiveLinkClasses =
    "text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white";

  const getNavLinkClass = ({ isActive }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const navLinks = (
    <>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/fridge" className={getNavLinkClass}>
        Fridge
      </NavLink>
      <NavLink to="/recipe-before-expiry" className={getNavLinkClass}>
        Recipes
      </NavLink>
      {!user && (
        <>
          <NavLink to="/login" className={getNavLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getNavLinkClass}>
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 p-2 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png" // replace with your logo path
            alt="Food Tracker Logo"
            className="h-12 w-auto p-1 bg-gradient-to-r from-green-200 to-lime-200 rounded-full"
          />
          <span className="text-3xl font-bold tracking-wide">FoodTrack</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center gap-4">{navLinks}</div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
                />
                <span className="text-green-800 dark:text-green-200 font-medium hidden md:inline">
                  {user.displayName || "Profile"}
                </span>
                <svg
                  className={`w-4 h-4 ml-1 text-green-600 dark:text-green-400 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <NavLink
                      to="/add-food"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Add Food
                    </NavLink>
                    <NavLink
                      to="/my-items"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Items
                    </NavLink>
                    <NavLink
                      to="/my-profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 font-semibold flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {!user && (
            <div className="hidden md:flex gap-2">
              <NavLink to="/login" className={getNavLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={getNavLinkClass}>
                Register
              </NavLink>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="text-green-700 dark:text-green-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white dark:bg-gray-800 shadow-lg z-40"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-green-500 dark:text-green-300">
                  Menu
                </h2>
                <button onClick={toggleMenu} aria-label="Close Menu">
                  <FaTimes size={22} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="px-4 py-4 space-y-3">
                {navLinks}
                {user && (
                  <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                    <Link
                      to="/add-food"
                      className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-700 text-green-700 dark:text-green-300 font-semibold"
                      onClick={toggleMenu}
                    >
                      Add Food
                    </Link>
                    <Link
                      to="/my-items"
                      className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-700 text-green-700 dark:text-green-300 font-semibold"
                      onClick={toggleMenu}
                    >
                      My Items
                    </Link>
                    <Link
                      to="/my-profile"
                      className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-700 text-green-700 dark:text-green-300 font-semibold"
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 font-semibold flex items-center gap-2 rounded"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black md:hidden z-30"
            ></motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
