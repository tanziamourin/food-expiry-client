import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import ExpiryCountdown from "./ExpiryCountdown";

const NearlyExpiryPage = () => {
  const [items, setItems] = useState([]);
  const [nearlyCount, setNearlyCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://food-expiry-server.vercel.app/foods") // সকল খাবার নিয়ে আসবে
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let nearly = 0;
        let expired = 0;

        // ৭ দিনের মধ্যে মেয়াদ উত্তীর্ণ হওয়া এবং expired ফিল্টার
        const filtered = data.filter((item) => {
          if (!item.expiryDate) return false;

          const expiry = new Date(item.expiryDate);
          expiry.setHours(0, 0, 0, 0);

          const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

          if (diffDays > 0 && diffDays <= 7) {
            nearly++;
            return true;
          } else if (diffDays <= 0) {
            expired++;
          }
          return false;
        });

        setNearlyCount(nearly);
        setExpiredCount(expired);
        setItems(filtered);
        setCurrentPage(1);
      })
      .catch((error) => console.error("❌ Fetch error:", error));
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 my-16">
      <h2 className="md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide ">
        Nearly Expiry
      </h2>

      {/* CountUp Stats */}
      <div className="flex justify-center gap-10 mb-12 text-center">
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

      {/* Items List */}
      {items.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No items expiring soon.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-hidden">
            {currentItems.map((item) => {
              const daysLeft = Math.ceil(
                (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={item._id}
                  className="relative group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-[420px] flex flex-col"
                >
                  {/* Corner Ribbon */}
                  <div
                    className={`absolute top-5 right-[-42px] rotate-45 px-10 py-1 text-xs font-bold text-white shadow-md z-10 ${
                      daysLeft <= 0
                        ? "bg-red-600 dark:bg-red-700"
                        : "bg-gradient-to-r from-orange-600 to-yellow-500"
                    }`}
                    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                  >
                    {daysLeft <= 0 ? "Expired" : "Expiring Soon"}
                  </div>

                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Category: <span className="font-medium">{item.category}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>

                    <div className="mt-2">
                      <ExpiryCountdown expiryDate={item.expiryDate} />
                    </div>

                    <button
                      onClick={() => navigate(`/foods/${item._id}`)}
                      className="mt-auto inline-block bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-md px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      See Details
                    </button>
                  </div>
                </div>
              );
            })}
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

export default NearlyExpiryPage;
