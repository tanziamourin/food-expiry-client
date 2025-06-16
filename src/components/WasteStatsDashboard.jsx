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
  "#f97316", "#facc15", "#4ade80", "#38bdf8", "#8b5cf6",
  "#f472b6", "#34d399", "#60a5fa", "#c084fc", "#fb923c",
  "#22d3ee", "#f43f5e"
];

const WasteStatsDashboard = () => {
  return (
    <section className="relative p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-xl mx-auto mt-20">
      <h2 className="text-5xl  font-bold text-green-800 dark:text-green-200 mb-4 text-center">
        Growth Chart
      </h2>

      {/* Growth arrow and star */}
     
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" barSize={40} radius={[10, 10, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={gradientColors[index % gradientColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
        Visualize your growth — reduce waste, and rise with purpose!
      </p>
    </section>
  );
};

export default WasteStatsDashboard;
