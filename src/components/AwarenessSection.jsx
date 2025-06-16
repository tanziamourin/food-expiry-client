import React from "react";
import Lottie from "lottie-react";
import wasteAnimation from "../assets//food-waste"; // You need to download a JSON animation
import CountUp from "react-countup";
import { motion } from "framer-motion";

const AwarenessSection = () => {
  return (
    <section className="bg-green-50 dark:bg-green-900 py-12 px-4 md:px-16 rounded-2xl shadow-lg my-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Lottie Animation */}
        <div>
          <Lottie animationData={wasteAnimation} loop={true} />
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-200 mb-4">
            Why Track Your Food?
          </h2>
          <p className="text-lg text-green-700 dark:text-green-300 mb-6">
            Every year, <strong>1.3 billion tons</strong> of food is wasted globally.
            With this app, you're helping reduce that!
          </p>

          <div className="space-y-4">
            <StatItem label="Food Saved (KG)" value={125} />
            <StatItem label="Expired Avoided" value={89} />
            <StatItem label="Money Saved ($)" value={340} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatItem = ({ label, value }) => {
  return (
    <motion.div
      className="bg-white dark:bg-green-800 p-4 rounded-xl shadow-md flex justify-between items-center"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-lg font-semibold text-green-800 dark:text-green-200">{label}</span>
      <span className="text-2xl font-bold text-green-700 dark:text-green-100">
        <CountUp end={value} duration={2.5} />
      </span>
    </motion.div>
  );
};

export default AwarenessSection;
