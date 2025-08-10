import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Assets
import leafAnimation from "../assets/leaf.json";
import fruitAnimation from "../assets/fruit.json";
import timerAnimation from "../assets/timer.json";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1673238104397-c287ff54a115?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Natural 100%",
    animation: leafAnimation,
    buttonText: "Track Now",
    link: "/track",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1613082589739-004c07170907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDkyfHx8ZW58MHx8fHx8",
    title: "Stay Fresh & Healthy",
    animation: fruitAnimation,
    buttonText: "Go to Fridge",
    link: "/fridge",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611102130306-1b8dc8839cd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExNnx8fGVufDB8fHx8fA%3D%3D",
    title: "Track Expiry Smartly",
    animation: timerAnimation,
    buttonText: "See Details",
    link: "/details",
  },
];

const HeroBannerLottie = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="relative h-[90vh] max-w-7xl mx-auto bg-white dark:bg-gray-900 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          {/* Background Image */}
          <img
            src={currentSlide.image}
            alt="Slide"
            className="absolute inset-0 w-full h-full object-cover bg-base-300 opacity-50"
          />

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="z-10 w-[180px] md:w-[300px] mx-auto"
          >
            <Lottie animationData={currentSlide.animation} loop={true} />
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, backgroundPosition: "0% 50%" }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: "100% 50%",
            }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="z-10 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 dark:text-white mt-4 
             px-6 py-3 rounded-md shadow-xl
             bg-gradient-to-r from-green-400 via-lime-400 to-green-500
             bg-[length:200%_200%] animate-[bg-move_6s_linear_infinite] 
             backdrop-blur-lg bg-opacity-40"
          >
            {currentSlide.title}
          </motion.h1>

          {/* Animated Button with Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="z-10 mt-6"
          >
            <Link
              to={currentSlide.link}
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-lime-500 text-white rounded-full shadow hover:scale-105 transition duration-300 text-sm sm:text-base md:text-lg"
            >
              {currentSlide.buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i ? "bg-green-500 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBannerLottie;
