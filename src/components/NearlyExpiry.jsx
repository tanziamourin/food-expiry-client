import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import ExpiryCountdown from "../components/ExpiryCountdown";

const NearlyExpiry = () => {
  const [items, setItems] = useState([]);
  const [nearlyCount, setNearlyCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0); // ✅ new state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/foods/expiring-soon")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Expiring foods fetched:", data);

        const today = new Date();
        let nearly = 0;
        let expired = 0;

        // ✅ Split items into two categories
        const filtered = data.filter((item) => {
          const expiry = new Date(item.expiryDate);
          const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

          if (diffDays <= 5 && diffDays > 0) {
            nearly++;
            return true; // show on list
          } else if (diffDays <= 0) {
            expired++;
          }
          return false; // don't show expired in grid
        });

        setNearlyCount(nearly);
        setExpiredCount(expired);
        setItems(filtered);
      })
      .catch((error) => console.error("❌ Fetch error:", error));
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-5xl my-10 mb-10 font-bold text-green-800 dark:text-green-200 text-center">
        ⏰ Nearly Expiry
      </h2>

      {/* CountUp Stats */}
      <div className="flex justify-center gap-10 mb-10 text-center">
        <div className="bg-gradient-to-r from-green-400 to-lime-500 text-white p-6 rounded-lg shadow-lg w-40">
          <p className="text-lg font-semibold">Nearly Expiring</p>
          <CountUp
            end={nearlyCount}
            duration={2}
            className="text-4xl font-extrabold mt-1"
          />
        </div>
        <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-lg shadow-lg w-40">
          <p className="text-lg font-semibold">Expired</p>
          <CountUp
            end={expiredCount}
            duration={2}
            className="text-4xl font-extrabold mt-1"
          />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No items expiring soon.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="relative border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden flex flex-col bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                {/* Corner Ribbon */}
                <div
                  className="absolute top-3 right-[-42px] rotate-45 px-10 py-1 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-lime-500 shadow-md"
                  style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                >
                  Expiring Soon
                </div>

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Category:{" "}
                    <span className="font-medium">{item.category}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>

                  {/* Countdown */}
                  <div className="mt-2">
                    <ExpiryCountdown expiryDate={item.expiryDate} />
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/foods/${item._id}`)}
                    className="mt-auto bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-md px-4 py-2 transition-colors duration-300"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default NearlyExpiry;
