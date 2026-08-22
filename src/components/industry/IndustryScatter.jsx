import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ZAxis,
  Cell,
} from "recharts";

import useIndustryData from "../../hooks/useIndustryData";

const COLORS = {
  "Dominant Industries": "#16a34a",
  "Premium (High Value/Bill)": "#f59e0b",
  "Established / Core": "#3b82f6",
  "Emerging / Niche": "#8b5cf6",
  "New / Insufficient Data": "#9ca3af",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const p = payload[0].payload;

  return (
    <div className="bg-white shadow-lg rounded-lg border p-4">

      <h3 className="font-semibold mb-2">
        {p.industry}
      </h3>

      <p>
        Revenue :
        ₹{(p.total_revenue / 100000).toFixed(2)} L
      </p>

      <p>
        Bills :
        {p.total_bills}
      </p>

      <p>
        Avg Revenue/Bill :
        ₹{Math.round(p.avg_revenue_per_bill)}
      </p>

      <p>
        Unique Franchises :
        {p.unique_franchises}
      </p>

      <p className="mt-2 text-sm text-gray-600">
        {p.cluster_label}
      </p>

      {p.low_confidence && (
        <p className="text-red-600 font-semibold mt-2">
          Low Confidence
        </p>
      )}

    </div>
  );
}

export default function IndustryScatter() {

  const { data, loading } = useIndustryData();

  if (loading)
    return null;

  const clusters = [...new Set(data.map(d => d.cluster_label))];

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold">
        Industry Performance Clusters
      </h2>

      <p className="text-gray-500 mb-6">
        Total Bills vs Average Revenue per Bill
      </p>

      <ResponsiveContainer width="100%" height={550}>

        <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="total_bills"
            name="Bills"
            label={{
              value: "Total Bills",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            type="number"
            dataKey="avg_revenue_per_bill"
            tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
            label={{
              value: "Average Revenue / Bill",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <ZAxis
            dataKey="unique_franchises"
            range={[50, 600]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
  iconType="circle"
  formatter={(value) => (
    <span
      style={{
        color: COLORS[value],
        fontWeight: 500,
      }}
    >
      {value}
    </span>
  )}
/>

          {clusters.map(cluster => (

            <Scatter
              key={cluster}
              name={cluster}
              data={data.filter(
                d => d.cluster_label === cluster
              )}
            >

              {data
                .filter(d => d.cluster_label === cluster)
                .map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[cluster]}
                    stroke={
                      entry.low_confidence
                        ? "#ef4444"
                        : "transparent"
                    }
                    strokeWidth={2}
                  />

                ))}

            </Scatter>

          ))}

        </ScatterChart>

      </ResponsiveContainer>

    </div>

  );
    

}