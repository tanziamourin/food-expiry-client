import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
    image: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchMyFoods = async () => {
      try {
        const res = await fetch(`http://localhost:5000/myfoods?email=${user.email}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        } else {
          alert("Failed to load your food items.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching your items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyFoods();
  }, [user]);

  // Handle opening update modal & set form data
  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      expiryDate: item.expiryDate.slice(0, 10), // format for input[type=date]
      image: item.image,
    });
    setShowUpdateModal(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/foods/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }

      setItems((prev) =>
        prev.map((item) =>
          item._id === selectedItem._id ? { ...item, ...formData } : item
        )
      );
      setShowUpdateModal(false);
      alert("Item updated successfully");
    } catch (err) {
      alert(`Failed to update item: ${err.message}`);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/foods/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }

      setItems((prev) => prev.filter((item) => item._id !== selectedItem._id));
      setShowDeleteModal(false);
      alert("Item deleted successfully");
    } catch (err) {
      alert(`Failed to delete item: ${err.message}`);
    }
  };

  if (!user) {
    return <p>Please log in to see your food items.</p>;
  }

  if (loading) {
    return <p>Loading your items...</p>;
  }

  if (items.length === 0) {
    return <p>You have no food items. Add some!</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Food Items</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-pink-200">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Expiry Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="text-center border border-gray-300">
              <td className="p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.quantity}</td>
              <td
                className={`p-2 font-medium ${
                  new Date(item.expiryDate) <= new Date(Date.now() + 2 * 86400000)
                    ? "text-red-700"
                    : "text-orange-500"
                }`}
              >
                {new Date(item.expiryDate).toLocaleDateString()}
              </td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => openUpdateModal(item)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => openDeleteModal(item)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Update Food Item</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Food Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Category"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                placeholder="Quantity"
                className="w-full px-3 py-2 border rounded"
                min={1}
              />
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete "{selectedItem.name}"?</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItems;
