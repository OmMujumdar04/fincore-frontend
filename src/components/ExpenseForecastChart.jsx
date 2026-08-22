import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

const formatLakhs = (v) => {
  if (v === null || v === undefined) return "";
  return `₹${(v / 100000).toFixed(2)}L`;
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
              {entry.name}: {formatLakhs(entry.value)}
            </p>
          );
        })}
        {isForecastMonth && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            {payload.find((p) => p.dataKey === "lower") && (
              <p>
                80% CI: {formatLakhs(payload.find((p) => p.dataKey === "lower")?.value)} –{" "}
                {formatLakhs(payload.find((p) => p.dataKey === "upper")?.value)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function ExpenseForecastChart({ data = [], loading, error }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 h-96 flex items-center justify-center animate-pulse text-gray-400">
        Loading Expense Forecast validation model...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 rounded-2xl p-6 border border-red-200">
        Failed to load Expense Forecast: {error}
      </div>
    );
  }

  // Find the exact cutoff month where validation forecast begins
  const firstForecastItem = data.find((d) => d.is_forecast);
  const forecastStartMonth = firstForecastItem ? firstForecastItem.month : "Apr-25";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Expense Forecast</h2>
          <p className="text-amber-600 font-medium text-sm mt-1">
            Validation Only — Historical Actuals (Apr 2023 – Mar 2025) vs Validation Run (Apr 2025 – Sep 2025)
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="text-gray-600 font-medium">Historical Spend</span>
          <span className="inline-block w-3 h-3 rounded-full bg-amber-600 ml-3"></span>
          <span className="text-gray-600 font-medium">Validation Forecast</span>
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
              tickFormatter={formatLakhs}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />

            {/* Validation Confidence Band */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="#fbbf24"
              fillOpacity={0.25}
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

            {/* Historical Expense Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 3, fill: "#2563eb" }}
              activeDot={{ r: 6 }}
              name="Historical Reliable Spend"
              connectNulls={false}
            />

            {/* Validation Forecast Line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#d97706"
              strokeWidth={3}
              strokeDasharray="6 4"
              dot={{ r: 4, fill: "#d97706" }}
              activeDot={{ r: 6 }}
              name="Validation Forecast"
              connectNulls={false}
            />

            {/* Reliable Cutoff Line */}
            {forecastStartMonth && (
              <ReferenceLine
                x={forecastStartMonth}
                stroke="#6b7280"
                strokeDasharray="4 4"
                label={{
                  value: "Reliable data cutoff",
                  position: "top",
                  fill: "#6b7280",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Validation Explanatory Card */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-800 flex items-center gap-2">
          <span>⚠️</span> Validation Only — Not a Live Forward Forecast
        </h3>
        <p className="text-sm text-gray-700 mt-2">
          Model trained exclusively on <b>Apr 2023 – Mar 2025</b> (24 verified monthly expenditure records).
        </p>
        <p className="text-sm text-gray-700 mt-1">
          <b>Apr 2025 – Sep 2025</b> is projected as a validation benchmark against historical seasonality.
        </p>
        <p className="text-sm text-red-600 mt-2 font-medium">
          Note: This is labeled Validation Only because granular monthly expense data currently ends at Mar 2025 in the source CRM.
        </p>
      </div>
    </div>
  );
}