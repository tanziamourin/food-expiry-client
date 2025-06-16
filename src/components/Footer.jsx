import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-r from-green-800 to-lime-700 text-white py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <Link to="/" onClick={scrollToTop}>
            <h2 className="text-2xl font-bold mb-2 hover:underline cursor-pointer">
              🍃 FoodTrack
            </h2>
          </Link>
          <p className="text-sm leading-relaxed">
            FoodTrack helps you track, manage, and avoid waste by keeping an eye on your food expiry dates. Smart. Simple. Sustainable.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-green-300 text-xl">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-green-300 text-xl">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-green-300 text-xl">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-green-300 text-xl">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" onClick={scrollToTop} className="hover:underline">Home</Link></li>
            <li><Link to="/my-items" className="hover:underline">My Items</Link></li>
            <li><Link to="/add-food" className="hover:underline">Add Food</Link></li>
         
          </ul>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-between">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FoodTrack. All rights reserved.
          </p>
          <p className="text-xs mt-4 text-green-200">
            Made ❤️ by Tanzia Mourin Chowdhury
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
