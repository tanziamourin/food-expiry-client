import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import ExpiryCountdown from "../components/ExpiryCountdown";

const NearlyExpiry = () => {
  const [items, setItems] = useState([]);
  const [nearlyCount, setNearlyCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://food-expiry-server.vercel.app/foods/expiring-soon")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Expiring foods fetched:", data);
        setItems(data);

        const today = new Date();
        let nearly = 0;
        let expired = 0;

        data.forEach((item) => {
          const expiry = new Date(item.expiryDate);
          const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

          if (diffDays <= 5 && diffDays > 0) nearly++;
          else if (diffDays <= 0) expired++;
        });

        setNearlyCount(nearly);
        setExpiredCount(expired);
      })
      .catch((error) => console.error("❌ Fetch error:", error));
  }, []);

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
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg w-40">
          <p className="text-lg font-semibold">Already Expired</p>
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
            {items.slice(0, 6).map((item) => {
              const daysLeft = Math.ceil(
                (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={item._id}
                  className="relative bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-2xl shadow-lg p-4 overflow-hidden flex flex-col"
                >
                  {/* Corner Ribbon */}
                  <div
                    className={`absolute top-3 right-[-40px] rotate-45 px-10 py-1 text-xs font-bold text-white shadow-lg ${
                      daysLeft <= 0
                        ? "bg-red-600 dark:bg-red-700"
                        : "bg-gradient-to-r from-green-400 to-lime-500"
                    }`}
                    style={{ boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}
                  >
                    {daysLeft <= 0 ? "Expired" : "Expiring Soon"}
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-50 object-cover rounded-md mb-3"
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

                  {/* Countdown Component */}
                  <div className="">
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

          {/* View All Button */}
          {items.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/all-nearly-expiry")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                View All Expiring Items
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NearlyExpiry;
