import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const NearlyExpiry = () => {
  const [items, setItems] = useState([]);
  const [nearlyCount, setNearlyCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/foods/expiring-soon")
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
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        ⏰ Nearly Expiry Items
      </h2>

      {/* CountUp Stats */}
      <div className="flex justify-center gap-10 mb-10 text-center">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <p className="text-lg font-semibold">Nearly Expiring</p>
          <CountUp end={nearlyCount} duration={2} className="text-3xl font-bold" />
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <p className="text-lg font-semibold">Already Expired</p>
          <CountUp end={expiredCount} duration={2} className="text-3xl font-bold" />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items expiring soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const daysLeft = Math.ceil(
              (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div key={item._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className={`text-sm font-medium ${daysLeft <= 0 ? 'text-red-700' : 'text-red-500'}`}>
                  Expiry Date: {new Date(item.expiryDate).toLocaleDateString()} ({daysLeft} days left)
                </p>
                <button
                  onClick={() => navigate(`/foods/${item._id}`)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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

export default NearlyExpiry;
