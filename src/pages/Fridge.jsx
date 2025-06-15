import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

const Fridge = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      let query = `http://localhost:5000/foods?search=${searchText}`;
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      const res = await fetch(`http://localhost:5000/foods/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        setFoodItems(prev => prev.filter(item => item._id !== id));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">🧊 My Fridge</h2>

      {/* Search + Filter UI */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or category..."
          className="input input-bordered w-full md:w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center mt-10 text-lg">Loading...</div>
      ) : foodItems.length === 0 ? (
        <p className="text-center text-gray-500">No food items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <FoodCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Fridge;
