import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/foods/${id}/notes`)
      .then((res) => res.json())
      .then((data) => setAllNotes(data));
  }, [id]);

  const handleAddNote = async () => {
    if (!note.trim()) return;
    const res = await fetch(`http://localhost:5000/foods/${id}/notes`, {
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
        { text: note, createdAt: new Date().toISOString(), authorEmail: user.email },
      ]);
    }
  };

  if (!food) return <p className="text-center mt-10 text-gray-600 dark:text-gray-400">Loading...</p>;

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
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Food Image */}
      <div className="overflow-hidden rounded-xl shadow-md mb-6">
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy"
        />
      </div>

      {/* Title and Info */}
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-3">{food.title}</h1>
      <div className="flex flex-wrap gap-6 mb-6 text-gray-700 dark:text-gray-300">
        <p className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full font-semibold">
          Category: {food.category}
        </p>
        <p className="bg-lime-100 dark:bg-lime-900 px-3 py-1 rounded-full font-semibold">
          Quantity: {food.quantity}
        </p>
      </div>

      {/* Expiry Info */}
      <p
        className={`text-lg font-semibold mb-6 ${
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

      {/* Notes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add Note</h2>
        <textarea
          rows={5}
          placeholder={isOwner ? "Write your note here..." : "Only owner can add notes"}
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
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Notes</h2>
        {allNotes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No notes yet.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200 dark:scrollbar-thumb-green-600 dark:scrollbar-track-gray-700">
            {allNotes.map((n, i) => (
              <div
                key={i}
                className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-4 shadow-sm"
              >
                <p className="text-gray-900 dark:text-green-200 font-medium">{n.text}</p>
                <p className="text-sm text-gray-600 dark:text-green-400 mt-2 select-text break-words">
                  By: <span className="font-semibold">{n.authorEmail}</span> on{" "}
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FoodDetails;
