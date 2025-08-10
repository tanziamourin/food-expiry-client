import React from "react";
import { motion } from "framer-motion";
import { FaDrumstickBite, FaCheese, FaCarrot, FaUtensils, FaCookieBite } from "react-icons/fa";

const recipeIdeas = [
  {
    category: "Meat",
    icon: <FaDrumstickBite size={22} />,
    ideas: ["Grilled Chicken Salad", "Beef Stir Fry", "Chicken Soup"],
    note: "Cook meat well and freeze leftovers to extend shelf life."
  },
  {
    category: "Dairy",
    icon: <FaCheese size={22} />,
    ideas: ["Cheese Omelette", "Yogurt Parfait", "Creamy Pasta"],
    note: "Use dairy in cooked dishes if nearing expiry."
  },
  {
    category: "Vegetables",
    icon: <FaCarrot size={22} />,
    ideas: ["Veggie Stir Fry", "Roasted Veggies", "Vegetable Soup"],
    note: "Chop and freeze excess vegetables for later use."
  },
  {
    category: "Meals",
    icon: <FaUtensils size={22} />,
    ideas: ["Leftover Fried Rice", "Pasta Bake", "Curry with Rice"],
    note: "Reheat thoroughly before eating."
  },
  {
    category: "Snacks",
    icon: <FaCookieBite size={22} />,
    ideas: ["Trail Mix", "Popcorn", "Smoothies with ripe fruits"],
    note: "Blend snacks into creative recipes to avoid waste."
  }
];

const RecipeBeforeExpiry = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide">
        Recipes & Meal Ideas Before Expiry
      </h1>

      <p className="text-center text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        Save food and money by using ingredients before they expire. Try these quick and easy meal ideas to give your meat, dairy, veggies, meals, and snacks a second life.
      </p>

      <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {recipeIdeas.map((item, index) => (
          <motion.li
            key={index}
            className="group relative overflow-hidden rounded-2xl p-6 bg-white/70 dark:bg-gray-900 border border-orange-200/50 dark:border-orange-700/40 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 text-white shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>

            <h2 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">{item.category}</h2>
            
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 mb-3">
              {item.ideas.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>

            <p className="text-sm italic text-gray-600 dark:text-gray-400">{item.note}</p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-orange-300 to-yellow-200 blur-2xl transition-opacity duration-500"></div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeBeforeExpiry;
