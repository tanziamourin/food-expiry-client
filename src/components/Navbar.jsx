import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout().catch((err) => console.error(err));
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

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
      {user && (
        <>
          <NavLink to="/add-food" className={getNavLinkClass}>
            Add Food
          </NavLink>
          <NavLink to="/my-items" className={getNavLinkClass}>
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
          className="text-2xl  font-bold text-green-800 dark:text-green-200 "
        >
          🍃 FoodTrack
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks}

          {user && (
            <>
              <NavLink to={"my-profile"} className="relative group">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
                />
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block text-sm bg-gray-800 text-white px-3 py-1 rounded shadow-lg transition duration-300">
                  {user.displayName}
                </div>
              </NavLink>
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

      {/* Mobile Slide-in Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.1 }}
              className="md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white dark:bg-gray-800 shadow-lg z-40"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold text-green-500 dark:text-green-300">
                  Menu
                </h2>
                <button onClick={toggleMenu} aria-label="Close Menu">
                  <FaTimes
                    size={22}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </button>
              </div>
              <div className="px-4 py-4 space-y-3">
                {navLinks}
                {/*  User Info */}
                <div className="px-4">
                  {user && (
                    <div className="relative group space-y-4">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-green-400 shadow-md"
                      />
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 hidden group-hover:block text-sm bg-gray-800 text-white px-3 py-1 rounded shadow-lg transition duration-300">
                        {user.displayName}
                      </div>

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
