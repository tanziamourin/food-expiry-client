import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Fridge = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination states
  const [expiringSoonPage, setExpiringSoonPage] = useState(1);
  const [freshPage, setFreshPage] = useState(1);
  const [expiredPage, setExpiredPage] = useState(1);

  const perPage = 6; // fixed items per page for all sections (simplified)

  useEffect(() => {
    document.title = "Fridge | FoodTrack";
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      let query = `https://food-expiry-server.vercel.app/foods?search=${searchText}`;
      if (selectedCategory) {
        query += `&category=${selectedCategory}`;
      }

      const res = await fetch(query);
      const data = await res.json();
      setFoodItems(data);
      setLoading(false);

      setExpiringSoonPage(1);
      setFreshPage(1);
      setExpiredPage(1);
    };

    fetchFoods();
  }, [searchText, selectedCategory]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filters
  const expiredItems = foodItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);
    return expiry < today;
  });

  const expiringSoonItems = foodItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff > 0 && diff <= 7;
  });

  const freshItems = foodItems.filter(item => {
    if (!item.expiryDate) return true;
    const expiry = new Date(item.expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff > 7;
  });

  // Pagination helpers
  const paginate = (items, page) => items.slice((page - 1) * perPage, page * perPage);
  const totalPages = (items) => Math.ceil(items.length / perPage);

  const PaginationControls = ({ page, total, onPrev, onNext }) => (
    <div className="flex justify-center items-center gap-6 mt-6 select-none">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="p-2 rounded-full bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition"
        aria-label="Previous Page"
      >
        <FaChevronLeft />
      </button>
      <span className="text-lg font-medium text-green-800 dark:text-green-300">
        {page} / {total || 1}
      </span>
      <button
        onClick={onNext}
        disabled={page === total || total === 0}
        className="p-2 rounded-full bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 transition"
        aria-label="Next Page"
      >
        <FaChevronRight />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide ">
         Fresh & Stored
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-200 placeholder-green-500 dark:placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-green-800 text-green-900 dark:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">All Categories</option>
            <option value="Dairy">Dairy 🥛</option>
            <option value="Meat">Meat 🍖</option>
            <option value="Vegetables">Vegetables 🥦</option>
            <option value="Snacks">Snacks 🍪</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-green-700 dark:text-green-300 text-xl font-semibold animate-pulse mt-24">
            Loading your fridge items...
          </p>
        ) : (
          <>
            {/* Expiring Soon */}
            {expiringSoonItems.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-orange-600  text-center">
                  ⏳ Expiring Soon
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginate(expiringSoonItems, expiringSoonPage).map(item => (
                    <FoodCard key={item._id} item={item} />
                  ))}
                </div>

                <PaginationControls
                  page={expiringSoonPage}
                  total={totalPages(expiringSoonItems)}
                  onPrev={() => setExpiringSoonPage(p => Math.max(p - 1, 1))}
                  onNext={() => setExpiringSoonPage(p => Math.min(p + 1, totalPages(expiringSoonItems)))}
                />
              </section>
            )}

            {/* Fresh */}
            {freshItems.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-green-700  text-center">
                  🥗 Fresh
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginate(freshItems, freshPage).map(item => (
                    <FoodCard key={item._id} item={item} />
                  ))}
                </div>

                <PaginationControls
                  page={freshPage}
                  total={totalPages(freshItems)}
                  onPrev={() => setFreshPage(p => Math.max(p - 1, 1))}
                  onNext={() => setFreshPage(p => Math.min(p + 1, totalPages(freshItems)))}
                />
              </section>
            )}

            {/* Expired */}
            {expiredItems.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-red-600  text-center">
                  💀 Expired
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {paginate(expiredItems, expiredPage).map(item => (
                    <FoodCard key={item._id} item={item} />
                  ))}
                </div>

                <PaginationControls
                  page={expiredPage}
                  total={totalPages(expiredItems)}
                  onPrev={() => setExpiredPage(p => Math.max(p - 1, 1))}
                  onNext={() => setExpiredPage(p => Math.min(p + 1, totalPages(expiredItems)))}
                />
              </section>
            )}

            {/* No items message */}
            {foodItems.length === 0 && !loading && (
              <p className="text-center text-green-700 dark:text-green-300 text-xl mt-24">
                No items found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Fridge;
