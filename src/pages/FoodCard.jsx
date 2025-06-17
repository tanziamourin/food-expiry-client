import React from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ item }) => {
  const navigate = useNavigate();

  const { _id, title, image, category, quantity, expiryDate } = item;

  const isExpired = new Date(expiryDate) < new Date();

  return (
    <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-2xl shadow-md p-4 flex flex-col justify-between">
      <img
        src={image}
        alt={title}
        className="rounded-sm w-full h-50 object-cover mb-4"
        loading="lazy"
      />

      <h3 className="text-xl font-semibold text-green-900 dark:text-green-200 mb-2">
        {title}
      </h3>

      <p className="text-green-800 dark:text-green-300 mb-1">
        Category: {category}
      </p>

      <p className="text-green-700 dark:text-green-400 font-medium mb-3">
        Quantity: {quantity}
      </p>

      {isExpired && (
        <span className="inline-block mb-3 px-3 py-1 bg-red-600 w-25 text-white text-sm rounded-full font-semibold">
          Expired
        </span>
      )}

      <button
        onClick={() => navigate(`/foods/${_id}`)}
        className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white font-semibold rounded-md px-4 py-2 transition"
      >
        See Details
      </button>
    </div>
  );
};

export default FoodCard;
