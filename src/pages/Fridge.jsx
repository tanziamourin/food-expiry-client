import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const Fridge = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = "Fridge | FoodTrack";
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      let query = `https://food-expiry-server.vercel.app/foods?search=${searchText}`;
      if (selectedCategory) {
        query += `&category=${selectedCategory}`;
      }

      const res = await fetch(query);
      const data = await res.json();
      setFoodItems(data);
      setLoading(false);
    };

    fetchFoods();
  }, [searchText, selectedCategory]);

  const handleSeeDetails = (id) => {
    console.log("See details for", id);
  };

  return (
   <div className="  bg-gradient-to-tr from-[#f3fff5] to-[#e5fbe0]">
     <div className="max-w-7xl  mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-green-200 dark:border-green-700 transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-text bg-gradient-text mb-10 drop-shadow-md">
        My Fridge
      </h2>

      {/* Search + Filter UI */}
      <div className="flex my-16 flex-col md:flex-row items-center justify-between gap-5 mb-10">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="w-full md:w-1/2 px-5 py-3 rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 transition-shadow duration-300 shadow-sm hover:shadow-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="w-full md:w-1/3 px-5 py-3 rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-200 focus:outline-none focus:ring-4 focus:ring-green-400 transition-shadow duration-300 shadow-sm hover:shadow-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy 🥛</option>
          <option value="Meat">Meat 🍖</option>
          <option value="Vegetables">Vegetables 🥦</option>
          <option value="Snacks">Snacks 🍪</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center mt-20 text-xl text-green-600 dark:text-green-400 font-semibold animate-pulse">
          Loading your fridge items...
        </div>
      ) : foodItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic text-lg">
          No food items found.
        </p>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-4 lg:grid-cols-5 gap-5">
          {foodItems.map((item) => (
            <FoodCard
              key={item._id}
              item={item}
              onSeeDetails={handleSeeDetails}
              className="hover:scale-[1.03] transition-transform duration-300"
            />
          ))}
        </div>
      )}
    </div>
   </div>
  );
};

export default Fridge;
