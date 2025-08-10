import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 20 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 40 },
  { name: "May", value: 50 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 70 },
  { name: "Aug", value: 80 },
  { name: "Sep", value: 85 },
  { name: "Oct", value: 90 },
  { name: "Nov", value: 95 },
  { name: "Dec", value: 100 },
];

const gradientColors = [
  "#f97316",
  "#facc15",
  "#4ade80",
  "#38bdf8",
  "#8b5cf6",
  "#f472b6",
  "#34d399",
  "#60a5fa",
  "#c084fc",
  "#fb923c",
  "#22d3ee",
  "#f43f5e",
];

const WasteStatsDashboard = () => {
  return (
    <section className="relative max-w-7xl mx-auto p-20 my-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg
    
     mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Text */}
        <div className="text-center md:text-left">
          <h2 className="md:text-5xl text-4xl  font-extrabold pb-4 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-8 text-center tracking-wide ">
            Growth Chart
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            This chart showcases your monthly progress in reducing food waste.
            Watch your numbers rise each month as you make smarter choices and
            reduce your environmental impact. Your journey towards zero waste is
            not just good for the planet—it’s good for you too.
          </p>

          {/* Example stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center md:text-left">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                120kg
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Waste Saved
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                85%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Goal Achieved
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                $560
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Money Saved
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Chart */}
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" barSize={40} radius={[10, 10, 0, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={gradientColors[index % gradientColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
        Visualize your growth — reduce waste, and rise with purpose!
      </p>
    </section>
  );
};

export default WasteStatsDashboard;
