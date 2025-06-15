import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.config"; // update path as needed
import toast from "react-hot-toast";
import { auth } from "../../firebase.config";

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
      setAllNotes((prev) => [...prev, { text: note, createdAt: new Date(), authorEmail: user.email }]);
    }
  };

  if (!food) return <p className="text-center mt-10">Loading...</p>;

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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={food.image}
        alt={food.title}
        className="w-full h-60 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{food.title}</h2>
      <p className="text-gray-600 mt-2">Category: {food.category}</p>
      <p className="text-gray-600">Quantity: {food.quantity}</p>

      <p
        className={`text-sm font-medium mt-2 ${
          new Date(food.expiryDate) <= new Date(Date.now() + 2 * 86400000)
            ? "text-red-700"
            : "text-orange-500"
        }`}
      >
        Expiry Date: {new Date(food.expiryDate).toLocaleDateString()} ({getCountdown()})
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Add Note:</h3>
        <textarea
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={!isOwner}
        />
        <button
          onClick={handleAddNote}
          disabled={!isOwner}
          className={`mt-2 px-4 py-2 rounded ${
            isOwner
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Add Note
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Notes:</h3>
        {allNotes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          allNotes.map((n, i) => (
            <div key={i} className="border p-3 rounded mb-2 bg-gray-50">
              <p className="text-gray-800">{n.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                By: {n.authorEmail} on {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
