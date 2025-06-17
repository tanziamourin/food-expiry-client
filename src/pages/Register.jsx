import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { createUser, googleLogin, githubLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | Food Track";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, photo, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await createUser(email, password, name, photo);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-4  bg-gradient-to-tr from-[#f3fff5] to-[#e5fbe0]">
      <div className="rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row bg-white dark:bg-black  border-b-lime-400 shadow-2xl shadow-lime-400 transition duration-300 my-16">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-500 to-lime-600 text-white p-8">
          <h2 className="text-4xl font-bold mb-4">Food Expiry Tracker</h2>
          <p className="text-center text-sm opacity-90">
            Track your food. Stay fresh. Reduce waste.
          </p>
          <img
            src="https://i.ibb.co/VYqkDmy/fridge-illustration.png"
            alt="food"
            className="w-64 mt-6"
          />
        </div>

        {/* Right Panel - Register Form */}
        <div className="p-10 w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-200 text-center mb-6">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="custom-input"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              onChange={handleChange}
              className="custom-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="custom-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="custom-input"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="custom-input"
              required
            />

            <button
              type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold p-3 rounded-lg transition"
            >
              Register
            </button>

            <button
              type="button"
              onClick={googleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold p-3 rounded-lg transition"
            >
              Register with Google
            </button>

            <button
              type="button"
              onClick={githubLogin}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold p-3 rounded-lg transition"
            >
              Register with GitHub
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
