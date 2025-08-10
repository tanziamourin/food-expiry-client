import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    document.title = "FoodDetails | FoodTrack";
  }, []);

  // Fetch food details
  useEffect(() => {
    fetch(`https://food-expiry-server.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);

        // Fetch related items after food is loaded
        if (data?.category) {
          fetch(`https://food-expiry-server.vercel.app/foods?category=${data.category}`)
            .then((res) => res.json())
            .then((items) => {
              const filtered = items.filter((item) => item._id !== id);
              setRelatedFoods(filtered);
            });
        }
      });
  }, [id]);

  // Fetch notes
  useEffect(() => {
    fetch(`https://food-expiry-server.vercel.app/foods/${id}/notes`)
      .then((res) => res.json())
      .then((data) => setAllNotes(data));
  }, [id]);

  const handleAddNote = async () => {
    if (!note.trim()) return;
    const res = await fetch(`https://food-expiry-server.vercel.app/foods/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: note,
        authorEmail: user.email,
      }),
    });

    const result = await res.json();
    if (result.insertedId) {
      toast.success("Note added");
      setNote("");
      setAllNotes((prev) => [
        ...prev,
        {
          text: note,
          createdAt: new Date().toISOString(),
          authorEmail: user.email,
        },
      ]);
    }
  };

  if (!food)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        Loading...
      </p>
    );

  const isOwner = food.userEmail === user?.email;

  const getCountdown = () => {
    const now = new Date();
    const expiry = new Date(food.expiryDate);
    const diffMs = expiry - now;
    if (diffMs <= 0) return "Expired";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        
        {/* Left - Image */}
        <div className="overflow-hidden rounded-xl shadow-md">
          <img
            src={food.image}
            alt={food.title}
            className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col gap-4 text-gray-800 dark:text-gray-200">
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            {food.title}
          </h1>
          <p className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full font-semibold w-fit">
            Category: {food.category}
          </p>
          <p className="bg-lime-100 dark:bg-lime-900 px-3 py-1 rounded-full font-semibold w-fit">
            Quantity: {food.quantity}
          </p>
          <p
            className={`text-lg font-semibold ${
              new Date(food.expiryDate) <= new Date(Date.now() + 2 * 86400000)
                ? "text-red-600 dark:text-red-400"
                : "text-orange-500 dark:text-orange-400"
            }`}
          >
            Expiry Date:{" "}
            <span className="underline decoration-green-500 decoration-2">
              {new Date(food.expiryDate).toLocaleDateString()}
            </span>{" "}
            — <span className="italic">{getCountdown()}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Description:</span> {food.description}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Added Date:</span>{" "}
            {new Date(food.addedDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Added By:</span> {food.userName || "Unknown"}
          </p>
        </div>
      </div>

      {/* Notes Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Note</h2>
        <textarea
          rows={4}
          placeholder={
            isOwner ? "Write your note here..." : "Only owner can add notes"
          }
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={!isOwner}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 resize-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <button
          onClick={handleAddNote}
          disabled={!isOwner}
          className={`mt-4 px-6 py-2 rounded-lg font-semibold shadow-md transition-colors duration-300 ${
            isOwner
              ? "bg-gradient-to-r from-green-600 to-lime-500 hover:from-lime-500 hover:to-green-600 text-white"
              : "bg-gray-400 cursor-not-allowed text-gray-100"
          }`}
        >
          Add Note
        </button>

        <div className="mt-6 space-y-4">
          {allNotes.length === 0 ? (
            <p className="text-gray-500 italic">No notes yet.</p>
          ) : (
            allNotes.map((n, i) => (
              <div
                key={i}
                className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4 shadow-sm"
              >
                <p className="text-gray-900 dark:text-green-200 font-medium">
                  {n.text}
                </p>
                <p className="text-sm text-gray-600 dark:text-green-400 mt-2">
                  By: <span className="font-semibold">{n.authorEmail}</span> on{" "}
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related Items */}
      {relatedFoods.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Items</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedFoods.map((item) => (
              <Link
                to={`/foods/${item._id}`}
                key={item._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default FoodDetails;
