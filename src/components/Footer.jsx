import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from "../../public/Green_Yellow_Flat_Modern_Food_Organic_Logo-removebg-preview.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebookF /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
    { href: "https://github.com", icon: <FaGithub /> },
  ];

  // Example: replace with real auth check
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <footer
      className="
        bg-gradient-to-r from-green-400 to-lime-500
        dark:bg-gradient-to-r dark:from-green-800 dark:to-lime-700
        dark:text-gray-100
        py-12 px-6 mt-10
      "
    >
      <div
        className="
          max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start
          p-6 rounded-lg
        "
      >
        {/* Logo & Description */}
        <div>
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-3"
          >
            <img
              src={logo}
              alt="Food Tracker Logo"
              className="h-15 w-auto p-1 bg-gradient-to-r from-green-200 to-lime-200 rounded-full"
            />
            <span className="text-3xl font-bold tracking-wide">FoodTrack</span>
          </Link>

          <p className="text-sm leading-relaxed mt-3 max-w-sm">
            FoodTrack helps you track, manage, and avoid waste by keeping an eye
            on your food expiry dates. Smart. Simple. Sustainable.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-green-700 hover:bg-green-200 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 transition-all shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-green-300 dark:border-green-500 pb-1 inline-block">
            Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/fridge" className="hover:underline">
                Fridge
              </Link>
            </li>
            <li>
              <Link to="/recipe-before-expiry" className="hover:underline">
                Recipes
              </Link>
            </li>

   
          </ul>
        </div>

        {/* Copyright */}
        <div className=" mt-20">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FoodTrack. All rights reserved.
          </p>
          <p className="text-xs mt-4">
            Made ❤️ by Tanzia Mourin Chowdhury
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
