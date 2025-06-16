import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {


   useEffect(() => {
      document.title = "Login | FoodTrack";
    }, []);


  const { login, githubLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    }
  };

  const handleGitHub = async () => {
    try {
      await githubLogin();
      toast.success("Logged in with GitHub");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "GitHub login failed");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  useEffect(() => {
    document.title = "Login | Food Expiry Tracker";
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f3fff5] to-[#e5fbe0] px-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col-reverse md:flex-row transition duration-300 border border-lime-200">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-green-500 via-lime-500 to-lime-600 text-white">
          <h2 className="text-4xl font-extrabold mb-4">Welcome Back</h2>
          <p className="text-sm leading-relaxed">
            Track your food. Stay fresh. Reduce waste. Log in to continue managing your fridge smartly.
          </p>
          <img
            src="https://i.ibb.co/VYqkDmy/fridge-illustration.png"
            alt="hobby"
            className="mt-6 w-full max-w-xs mx-auto"
          />
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h3 className="text-3xl font-bold text-center text-lime-600 mb-6">Login to Your Account</h3>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-lime-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGitHub}
              className="w-full py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-lg transition"
            >
              Login with GitHub
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-lime-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
