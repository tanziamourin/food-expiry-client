import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Food | FoodTrack";
  }, []);

  const [formData, setFormData] = useState({
    image: "",
    foodName: "",
    title: "",
    category: "",
    quantity: 1,
    unit: "pieces",
    expiryDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto p-8 mt-20 bg-red-50 rounded-lg shadow-lg text-center">
        <p className="text-red-700 font-semibold text-lg">
          Please log in to add food items.
        </p>
      </div>
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
      toast.error("Please log in to add food.");
      return;
    }

    if (
      !formData.image.trim() ||
      !formData.foodName.trim() ||
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.expiryDate.trim()
    ) {
      toast.error("Please complete all required fields marked with *.");
      return;
    }

    setLoading(true);

    const newFood = {
      image: formData.image.trim(),
      foodName: formData.foodName.trim(),
      title: formData.title.trim(),
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      expiryDate: formData.expiryDate,
      description: formData.description.trim(),
      addedDate: new Date().toISOString(),
      userEmail: user.email,
    };

    try {
      const res = await fetch("https://food-expiry-server.vercel.app/foods", {
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
          foodName: "",
          title: "",
          category: "",
          quantity: 1,
          unit: "pieces",
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
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 mt-14 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transition-colors duration-500">
      <h1 className="md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide  ">
        Add a New Food Item
      </h1>
      <p className="mb-8 text-center text-gray-700 dark:text-gray-300 text-lg font-medium">
        Enter the details of the food item you want to add. Fields marked{" "}
        <span className="text-red-600">*</span> are mandatory.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Food Image URL <span className="text-red-600 ml-1">*</span>
            <span
              title="Paste a direct link to the food image (must start with https://)"
              className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
              aria-label="Image URL help"
            >
              ❔
            </span>
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/food-image.jpg"
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Food Name */}
        <div>
          <label
            htmlFor="foodName"
            className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Food Name <span className="text-red-600 ml-1">*</span>
            <span
              title="The common or commercial name of the food."
              className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
              aria-label="Food Name help"
            >
              ❔
            </span>
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="e.g., Fresh Strawberries"
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Food Title <span className="text-red-600 ml-1">*</span>
            <span
              title="A short descriptive title or label, e.g. Summer Special"
              className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
              aria-label="Food Title help"
            >
              ❔
            </span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Summer Special"
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Category <span className="text-red-600 ml-1">*</span>
            <span
              title="Choose the category that best describes this food item"
              className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
              aria-label="Category help"
            >
              ❔
            </span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="Dairy">Dairy 🥛</option>
            <option value="Meat">Meat 🍖</option>
            <option value="Vegetables">Vegetables 🥦</option>
            <option value="Snacks">Snacks 🍪</option>
            <option value="Beverages">Beverages 🥤</option>
            <option value="Fruits">Fruits 🍎</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Quantity & Unit */}
        <div className="flex gap-8">
          <div className="flex-1">
            <label
              htmlFor="quantity"
              className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
            >
              Quantity <span className="text-red-600 ml-1">*</span>
              <span
                title="Specify how many units of this food you have"
                className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
                aria-label="Quantity help"
              >
                ❔
              </span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
            />
          </div>
          <div className="w-40">
            <label
              htmlFor="unit"
              className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
            >
              Unit
              <span
                title="Select the unit that matches the quantity"
                className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
                aria-label="Unit help"
              >
                ❔
              </span>
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
            >
              <option value="pieces">Pieces</option>
              <option value="grams">Grams</option>
              <option value="liters">Liters</option>
              <option value="bars">Bars</option>
            </select>
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label
            htmlFor="expiryDate"
            className="flex items-center mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Expiry Date <span className="text-red-600 ml-1">*</span>
            <span
              title="Select the expiration date of this food item"
              className="ml-2 text-sm cursor-help text-green-600 dark:text-green-400"
              aria-label="Expiry Date help"
            >
              ❔
            </span>
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-gray-900 dark:text-gray-100"
          >
            Additional Notes (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add any extra information or instructions here"
            rows={4}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-3 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-600 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-8 font-semibold rounded-2xl bg-gradient-to-r from-green-700 to-lime-500 text-white shadow-lg hover:from-lime-500 hover:to-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Food..." : "Add Food Item"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
