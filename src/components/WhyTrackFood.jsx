import React from "react";
import Marquee from "react-fast-marquee";
import {
  FaEye,
  FaClipboardCheck,
  FaThumbsUp,
  FaThumbsDown,
  FaUtensils,
  FaRegCalendarAlt,
  FaExclamationTriangle,
  FaChartLine,
  FaBell,
  FaHistory,
} from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <FaEye className="text-green-700 w-8 h-8" />,
    title: "Creates Awareness",
    description: "Understand your eating habits and patterns clearly.",
  },
  {
    icon: <FaClipboardCheck className="text-green-700 w-8 h-8" />,
    title: "Creates Accountability",
    description: "Stay responsible and motivated by tracking your food intake.",
  },
  {
    icon: <FaThumbsUp className="text-green-700 w-8 h-8" />,
    title: "Shows You What You Are Doing Well",
    description: "Identify positive eating behaviors to keep up.",
  },
  {
    icon: <FaThumbsDown className="text-red-600 w-8 h-8" />,
    title: "Shows You What You Are Not Doing Well",
    description: "Spot areas that need improvement in your diet.",
  },
  {
    icon: <FaUtensils className="text-green-700 w-8 h-8" />,
    title: "Shows You How Much You Eat",
    description: "Keep track of portion sizes and total intake.",
  },
  {
    icon: <FaRegCalendarAlt className="text-green-700 w-8 h-8" />,
    title: "Shows You How Often You Eat",
    description: "Monitor meal frequency and timing.",
  },
  {
    icon: <FaExclamationTriangle className="text-red-600 w-8 h-8" />,
    title: "Helps Detect Food Intolerances",
    description: "Recognize foods that might be causing issues.",
  },
  {
    icon: <FaChartLine className="text-green-700 w-8 h-8" />,
    title: "Helps Identify Patterns",
    description: "Find trends in your eating habits over time.",
  },
  {
    icon: <FaBell className="text-green-700 w-8 h-8" />,
    title: "Helps Identify Triggers",
    description: "Spot emotional or environmental triggers that affect eating.",
  },
  {
    icon: <FaHistory className="text-green-700 w-8 h-8" />,
    title: "Allows You To Reflect On Progress",
    description: "Review your journey and celebrate improvements.",
  },
];

const lightGradients = [
  "bg-gradient-to-tr from-green-400 via-green-300 to-green-200",
  "bg-gradient-to-tr from-green-300 via-green-200 to-green-100",
];

const darkGradients = [
  "bg-gradient-to-tr from-green-900 via-green-800 to-green-700",
  "bg-gradient-to-tr from-green-800 via-green-700 to-green-600",
];

const WhyTrackFood = () => {
  // Manually toggle dark mode here
  const isDark = false; // Change to true to see dark mode styles

  const gradients = isDark ? darkGradients : lightGradients;

  return (
    <section className={`max-w-7xl mx-auto px-8 py-10 p-20  `}>
      <h2 className={`md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide `}>
        Why Track Your Food?
      </h2>

      {/* Marquee - left scroll */}
      <div className="rounded-3xl bg-transparent py-2 overflow-hidden">
        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="flex space-x-10 px-4">
            {benefits.map(({ icon, title, description }, idx) => (
              <motion.div
                key={"left-" + idx}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.25)" }}
                className={`
                  flex items-center space-x-5
                  cursor-pointer
                  p-15 rounded-xl
                  min-w-[320px]
                  transition-shadow duration-300
                  ${isDark ? "text-gray-100" : "text-gray-900"}
                  ${gradients[idx % gradients.length]}
                `}
              >
                <div className="text-white">{icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <p className="text-sm max-w-xs opacity-90">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Marquee - right scroll */}
      <div className="rounded-3xl bg-transparent py-2 overflow-hidden">
        <Marquee pauseOnHover speed={50} gradient={false} direction="right">
          <div className="flex space-x-10 px-4">
            {benefits.map(({ icon, title, description }, idx) => (
              <motion.div
                key={"right-" + idx}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.25)" }}
                className={`
                  flex items-center space-x-5
                  cursor-pointer
                  p-15 rounded-xl
                  min-w-[320px]
                  transition-shadow duration-300
                  ${isDark ? "text-gray-100" : "text-gray-900"}
                  ${gradients[idx % gradients.length]}
                `}
              >
                <div className="text-white">{icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <p className="text-sm max-w-xs opacity-90">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default WhyTrackFood;
