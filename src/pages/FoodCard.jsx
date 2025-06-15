const FoodCard = ({ item, onDelete }) => {
  const { _id, name, quantity, storage, expiryDate } = item;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative">
      <h3 className="text-xl font-semibold text-green-600 mb-1">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {quantity}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Storage: {storage}</p>
      <p className="text-sm text-red-500 mt-2">Expires on: {expiryDate}</p>
      <button
        onClick={() => onDelete(_id)}
        className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition duration-300"
      >
        Delete
      </button>
    </div>
  );
};

export default FoodCard;
