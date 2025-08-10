import React from "react";
import { useNavigate } from "react-router-dom";
import ExpiryCountdown from "../components/ExpiryCountdown";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();
  const { _id, title, image, category, quantity, expiryDate } = item;

  const today = new Date();
  const expiry = new Date(expiryDate);

  const isExpired = expiry < today;
  const daysToExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); // days left

  return (
    <div
      className="relative group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-[420px] flex flex-col"
    >
      {/* Corner Ribbon */}
      {isExpired ? (
        <div className="absolute top-5 right-[-42px] rotate-45 px-10 py-1 text-xs font-bold text-white bg-red-600 shadow-md z-10">
          Expired
        </div>
      ) : daysToExpiry <= 7 ? (
        <div className="absolute top-5 right-[-42px] rotate-45 px-10 py-1 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-yellow-500 shadow-md z-10">
          Expiring Soon
        </div>
      ) : null}

      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Category: <span className="font-medium">{category}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Quantity: <span className="font-medium">{quantity}</span>
        </p>

        <div className="mt-2">
          <ExpiryCountdown expiryDate={expiryDate} />
        </div>

        <button
          onClick={() => navigate(`/foods/${_id}`)}
          className="mt-auto inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-md px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
