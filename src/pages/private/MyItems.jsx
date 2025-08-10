import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const MyItems = () => {
  const { user, getJWT } = useContext(AuthContext);
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    expiryDate: "",
    image: "",
  });

  useEffect(() => {
    document.title = "MyItems | FoodTrack";
  }, []);

  //  Show toast if redirected after adding
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("added") === "true") {
      toast.success("Food added successfully!");
    }
  }, [location.search]);

  // Fetch food items
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const success = await getJWT(user.email);
      if (!success) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://food-expiry-server.vercel.app/myfoods?email=${user.email}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setItems(data);
        } else {
          Swal.fire("Error", "Failed to load your food items.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong while fetching items.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, getJWT, location.search]);

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      expiryDate: item.expiryDate.slice(0, 10),
      image: item.image,
    });
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://food-expiry-server.vercel.app/foods/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
      Swal.fire("Updated!", "Item updated successfully.", "success");
    } catch (err) {
      Swal.fire("Update Failed", err.message, "error");
    }
  };

  const openDeleteModal = async (item) => {
    setSelectedItem(item);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${item.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      handleDeleteConfirm(item);
    }
  };

  const handleDeleteConfirm = async (item) => {
    try {
      const res = await fetch(`https://food-expiry-server.vercel.app/foods/${item._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Delete failed");
      }

      setItems((prev) => prev.filter((f) => f._id !== item._id));
      Swal.fire("Deleted!", "Item deleted successfully.", "success");
    } catch (err) {
      Swal.fire("Delete Failed", err.message, "error");
    }
  };

  if (!user) return <p>Please log in to see your food items.</p>;

  if (loading) return <p>Loading your items...</p>;

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center my-26 ">
       <section className="text-center my-10 ">
         <h2 className="text-4xl font-bold mb-5">No Food Items Found</h2>
        <p className="mb-4">You haven’t added any food items yet.</p>
        <a
          href="/add-food"
          className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-md  transition-colors duration-300"
        >
          Add Food Item
        </a>
       </section>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl my-10 mb-10 font-bold text-green-800 dark:text-green-200 text-center">My Food Items</h1>

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
              {formData.image && (
                <div className="text-center">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 mx-auto rounded object-cover"
                  />
                </div>
              )}
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
    </div>
  );
};

export default MyItems;
