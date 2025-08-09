import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

   useEffect(() => {
      document.title = "AddFood | FoodTrack";
    }, []);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    quantity: 1,
    expiryDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-8">
        Please log in to add food items.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.email) {
    toast.error("You must be logged in to add food.");
    return;
  }

  if (!formData.image || !formData.title || !formData.category || !formData.expiryDate) {
    toast.error("Please fill in all required fields.");
    return;
  }

  setLoading(true);

  const newFood = {
    image: formData.image,
    title: formData.title,
    category: formData.category,
    quantity: Number(formData.quantity),
    expiryDate: formData.expiryDate,
    description: formData.description,
    addedDate: new Date().toISOString(),
    userEmail: user.email,
  };

  try {
    const res = await fetch("http://localhost:5000/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newFood),
    });

    if (res.ok) {
      toast.success("Food item added successfully!");
      setFormData({
        image: "",
        title: "",
        category: "",
        quantity: 1,
        expiryDate: "",
        description: "",
      });

      setTimeout(() => {
        navigate("/my-items");
      }, 1200);
    } else {
      const errorData = await res.json();
      toast.error("Failed to add food: " + errorData.error);
    }
  } catch (err) {
    console.error(err);
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-xl mx-auto p-8 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 transition-colors duration-500 mt-10">
      <h1 className="text-4xl font-extrabold bg-gradient-text mb-6 text-center">
       <span className=" "> Add New</span> Food Item
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Food Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 placeholder-green-400 dark:placeholder-green-600 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Food Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="E.g. Ice Cream"
            required
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 placeholder-green-400 dark:placeholder-green-600 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Fruits">Fruits</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 placeholder-green-400 dark:placeholder-green-600 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label
            htmlFor="expiryDate"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-semibold text-green-900 dark:text-green-200"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional"
            rows={3}
            className="w-full rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-900 px-4 py-3 text-green-900 dark:text-green-200 placeholder-green-400 dark:placeholder-green-600 shadow-sm focus:outline-none focus:ring-3 focus:ring-green-400 dark:focus:ring-green-600 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white font-semibold rounded-md px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
