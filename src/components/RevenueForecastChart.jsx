import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const currencyFormatter = (value) => {
  if (value === null || value === undefined) return "";
  return `₹${(value / 100000).toFixed(2)}L`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isForecastMonth = payload.some((p) => p.dataKey === "forecast" && p.value !== null);
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-sm">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => {
          if (entry.value === null || entry.value === undefined) return null;
          if (entry.dataKey === "upper" || entry.dataKey === "lower") return null;
          return (
            <p key={`tooltip-${index}`} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {currencyFormatter(entry.value)}
            </p>
          );
        })}
        {isForecastMonth && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            {payload.find((p) => p.dataKey === "lower") && (
              <p>
                80% CI: {currencyFormatter(payload.find((p) => p.dataKey === "lower")?.value)} –{" "}
                {currencyFormatter(payload.find((p) => p.dataKey === "upper")?.value)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function RevenueForecastChart({ data = [], loading, error }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 h-96 flex items-center justify-center animate-pulse text-gray-400">
        Loading Revenue Forecast model...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 rounded-2xl p-6 border border-red-200">
        Failed to load Revenue Forecast: {error}
      </div>
    );
  }

  // Find the exact cutoff month where forecast begins
  const firstForecastItem = data.find((d) => d.is_forecast);
  const forecastStartMonth = firstForecastItem ? firstForecastItem.month : "Jul-26";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Revenue Forecast</h2>
          <p className="text-gray-500 text-sm mt-1">
            Historical Actuals (Apr 2022 – Jun 2026) vs Prophet 6-Month Projection (Jul 2026 – Dec 2026)
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="text-gray-600 font-medium">Historical</span>
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-600 ml-3"></span>
          <span className="text-gray-600 font-medium">Forecast (80% CI)</span>
        </div>
      </div>

      <div className="h-[480px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="month"
              interval="preserveStartEnd"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <YAxis
              tickFormatter={currencyFormatter}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />

            {/* Confidence Band (Shaded Area between Upper & Lower bounds) */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="#bbf7d0"
              fillOpacity={0.4}
              legendType="none"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#ffffff"
              fillOpacity={1}
              legendType="none"
            />

            {/* Historical Revenue Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3, fill: "#2563eb" }}
              activeDot={{ r: 6 }}
              name="Historical Actual Revenue"
              connectNulls={false}
            />

            {/* Forecast Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#16a34a"
              strokeWidth={3}
              strokeDasharray="6 4"
              dot={{ r: 4, fill: "#16a34a" }}
              activeDot={{ r: 6 }}
              name="Prophet Forecast"
              connectNulls={false}
            />

            {/* Forecast Start Reference Line */}
            {forecastStartMonth && (
              <ReferenceLine
                x={forecastStartMonth}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: "Forecast Start",
                  position: "top",
                  fill: "#ef4444",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}