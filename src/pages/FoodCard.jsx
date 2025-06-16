import React from "react";

const FoodCard = ({ item, onSeeDetails }) => {
  const { _id, title, image, category, quantity, expiryDate } = item;

  // Check if expired
  const isExpired = new Date(expiryDate) < new Date();

  return (
    <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-2xl shadow-md p-4 flex flex-col justify-between">
      {/* Food Image */}
      <img
        src={image}
        alt={title}
        className="rounded-sm w-full h-50 object-cover mb-4"
        loading="lazy"
      />

      {/* Title */}
      <h3 className="text-xl font-semibold text-green-900 dark:text-green-200 mb-2">
        {title}
      </h3>

      {/* Category */}
      <p className="text-green-800 dark:text-green-300 mb-1">Category: {category}</p>

      {/* Quantity */}
      <p className="text-green-700 dark:text-green-400 font-medium mb-3">
        Quantity: {quantity}
      </p>

      {/* Expired Badge */}
      {isExpired && (
        <span className="inline-block mb-3 px-3 py-1 bg-red-600 w-25 text-white text-sm  rounded-full font-semibold">
          Expired
        </span>
      )}

      {/* See Details Button */}
      <button
        onClick={() => onSeeDetails(_id)}
        className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white font-semibold rounded-md px-4 py-2 transition"
      >
        See Details
      </button>
    </div>
  );
};

export default FoodCard;
