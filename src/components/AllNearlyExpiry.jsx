import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpiryCountdown from "../components/ExpiryCountdown";

const AllNearlyExpiry = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/foods/expiring-soon")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) =>
        console.error("Error fetching all nearly expiring foods:", err)
      );
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-green-800 dark:text-green-200 text-center mb-8">
        🧾 All Nearly Expiring Foods
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No expiring food found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const daysLeft = Math.ceil(
              (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={item._id}
                className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 overflow-hidden flex flex-col"
              >
                <div
                  className={`absolute top-3 right-[-40px] rotate-45 px-10 py-1 text-xs font-bold text-white shadow-lg ${
                    daysLeft <= 0
                      ? "bg-red-600 dark:bg-red-700"
                      : "bg-gradient-to-r from-green-400 to-lime-500"
                  }`}
                >
                  {daysLeft <= 0 ? "Expired" : "Expiring Soon"}
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Category: {item.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quantity: {item.quantity}
                </p>

                <div className="mt-3">
                  <ExpiryCountdown expiryDate={item.expiryDate} />
                </div>

                <button
                  onClick={() => navigate(`/foods/${item._id}`)}
                  className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-500 text-white font-semibold rounded-md px-4 py-2 transition"
                >
                  See Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AllNearlyExpiry;
