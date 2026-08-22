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

import useSubIndustryData from "../../hooks/useSubIndustryData";

const COLORS = {
  "Dominant Sub-Industries": "#16a34a",
  "Premium (High Value/Bill)": "#f59e0b",
  "Established / Core": "#3b82f6",
  "Emerging / Niche": "#8b5cf6",
  "New / Insufficient Data": "#9ca3af",
};

const ORDER = [
  "Dominant Sub-Industries",
  "Premium (High Value/Bill)",
  "Established / Core",
  "Emerging / Niche",
  "New / Insufficient Data",
];

export default function SubIndustryBarChart() {

  const { data, loading } = useSubIndustryData();

  if (loading) return null;

  const counts = {};

  data.forEach((row) => {

    counts[row.cluster_label] =
      (counts[row.cluster_label] || 0) + 1;

  });

  const chartData = ORDER.map((cluster) => ({

    cluster,

    count: counts[cluster] || 0,

    color: COLORS[cluster],

  }));

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold">

        Sub Industry Count by Cluster

      </h2>

      <p className="text-gray-500 mb-5">

        Total Sub Industries : {data.length}

      </p>

      <ResponsiveContainer width="100%" height={450}>

        <BarChart
          data={chartData}
          margin={{
            top: 20,
            left: 20,
            right: 20,
            bottom: 70,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="cluster"
            angle={-10}
            textAnchor="end"
            interval={0}
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
          >

            {chartData.map((entry, index) => (

              <Cell
                key={index}
                fill={entry.color}
              />

            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}