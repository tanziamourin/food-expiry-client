// src/components/ExpiryCountdown.jsx
import PropTypes from "prop-types";

const ExpiryCountdown = ({ expiryDate }) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  return (
    <p
      className={`text-sm font-medium ${
        diffDays <= 0 ? "text-red-700" : "text-red-500"
      }`}
    >
      Expiry Date: {expiry.toLocaleDateString()} ({diffDays} days left)
    </p>
  );
};

ExpiryCountdown.propTypes = {
  expiryDate: PropTypes.string.isRequired,
};

export default ExpiryCountdown;
