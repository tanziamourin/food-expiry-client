import React from "react";
import { FaLeaf, FaClipboardList, FaCogs, FaFlagCheckered } from "react-icons/fa";
import { motion } from "framer-motion";

const staticTips = [
  {
    icon: <FaClipboardList size={28} />,
    title: "Planning",
    text: "Plan your meals ahead to avoid buying unnecessary items.",
    colorFrom: "from-blue-400",
    colorTo: "to-blue-300",
    shadowColor: "shadow-blue-300/50",
  },
  {
    icon: <FaCogs size={28} />,
    title: "Process",
    text: "Store fruits and vegetables properly to extend their shelf life.",
    colorFrom: "from-green-400",
    colorTo: "to-green-300",
    shadowColor: "shadow-green-300/50",
  },
  {
    icon: <FaFlagCheckered size={28} />,
    title: "Success",
    text: "Use leftovers creatively to make new meals.",
    colorFrom: "from-red-400",
    colorTo: "to-red-300",
    shadowColor: "shadow-red-300/50",
  },
];

const Tips = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl my-10 mb-10 font-bold text-green-800 dark:text-green-200 text-center">
        Food-Saving Tips
      </h1>
      <div className="grid md:grid-cols-3 gap-12">
        {staticTips.map(({ icon, title, text, colorFrom, colorTo, shadowColor }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`relative rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg ${shadowColor}`}
          >
            {/* Icon circle with gradient background */}
            <div
              className={`w-14 h-14 mb-6 flex items-center justify-center rounded-full bg-gradient-to-tr ${colorFrom} ${colorTo} text-white shadow-md`}
            >
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>

            {/* Text */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>

            {/* Speech bubble tail shape below */}
            <div
              className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-white dark:bg-gray-900 rounded-tl-2xl rounded-tr-2xl drop-shadow-md`}
              style={{
                boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
