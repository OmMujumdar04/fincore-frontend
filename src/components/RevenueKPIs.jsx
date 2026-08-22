export default function RevenueKPIs({ kpi, computedAt, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 h-36 bg-gray-100"></div>
        ))}
      </div>
    );
  }

  if (!kpi) return null;

  const formatLakhs = (val) => (val ? `₹${(val / 100000).toFixed(2)}L` : "₹0L");
  const formatCrores = (val) => (val ? `₹${(val / 10000000).toFixed(2)} Cr` : "₹0 Cr");

  const yoyPct = kpi.next_month_yoy_pct;
  const isPositiveYoy = yoyPct !== null && yoyPct >= 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Month Forecast */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">
            Next Month Forecast ({kpi.next_month_label})
          </p>

          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            {formatLakhs(kpi.next_month_val)}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            Range: {formatLakhs(kpi.next_month_lower)} – {formatLakhs(kpi.next_month_upper)}
          </p>

          {yoyPct !== null && (
            <p className={`text-sm font-medium mt-1 ${isPositiveYoy ? "text-emerald-600" : "text-red-500"}`}>
              YoY vs Prior Year: {isPositiveYoy ? `+${yoyPct}%` : `${yoyPct}%`}
            </p>
          )}
        </div>

        {/* Last Actual Month */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">
            Last Actual Month ({kpi.last_actual_label})
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {formatLakhs(kpi.last_actual_val)}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            Latest validated monthly revenue
          </p>
        </div>

        {/* 6-Month Forecast Total */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">
            6-Month Forecast Total
          </p>

          <h2 className="text-4xl font-bold text-purple-600 mt-3">
            {formatCrores(kpi.forecast_total_6m)}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            {kpi.forecast_period_label} ({formatLakhs(kpi.forecast_total_6m)})
          </p>
        </div>
      </div>

      {computedAt && (
        <div className="text-right text-xs text-gray-400">
          Data computed as of: {new Date(computedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}