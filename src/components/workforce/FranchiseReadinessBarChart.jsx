import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

// Colors are a fixed visual palette (not data), reused across the app's charts.
// Falls back to a neutral gray for any flag not explicitly listed, so a new
// flag introduced by future rule changes never breaks rendering.
const colors = {
  "Insufficient Data Overall": "#9ca3af",
  "New Hire — No Trajectory Yet": "#38bdf8",
  "Mixed Signal — No Clear Read": "#f59e0b",
  "Stable Core Performer": "#2563eb",
  "At Risk — Declining": "#ef4444",
  "Established — Currently Strong": "#16a34a",
  "High Confidence — Scaled & Accelerating": "#9333ea",
};

export default function FranchiseReadinessBarChart({ summary, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        Loading...
      </div>
    );
  }

  const chartData = [...summary]
    .sort((a, b) => b.count - a.count)
    .map((row) => ({
      flag: row.readiness_flag,
      count: row.count,
      color: colors[row.readiness_flag] || "#64748b",
    }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold">Franchise Readiness Distribution</h3>
      <p className="text-gray-500 mb-6">
        Total Franchises : {chartData.reduce((sum, r) => sum + r.count, 0)}
      </p>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 90 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="flag" interval={0} angle={-25} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}