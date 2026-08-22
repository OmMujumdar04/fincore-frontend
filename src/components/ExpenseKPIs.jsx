export default function ExpenseKPIs({ kpi, computedAt, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 h-36 bg-gray-100"></div>
        ))}
      </div>
    );
  }

  if (!kpi) return null;

  const formatLakhs = (val) => (val ? `₹${(val / 100000).toFixed(2)}L` : "₹0L");

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Validation Window */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">Validation Window</p>
          <h2 className="text-3xl font-bold text-amber-600 mt-3">{kpi.next_month_label}</h2>
          <p className="text-gray-500 text-sm mt-2">{kpi.validation_period_label}</p>
        </div>

        {/* Average Historical Spend */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">Avg Reliable Spend</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-3">{formatLakhs(kpi.historical_avg_val)}</h2>
          <p className="text-gray-500 text-sm mt-2">Per Month (Apr23–Mar25)</p>
        </div>

        {/* Range */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm font-medium">Next Month Prediction</p>
          <h2 className="text-3xl font-bold text-green-600 mt-3">{formatLakhs(kpi.next_month_val)}</h2>
          <p className="text-gray-500 text-sm mt-2">
            Range: {formatLakhs(kpi.next_month_lower)} – {formatLakhs(kpi.next_month_upper)}
          </p>
        </div>

        {/* Status Callout */}
        <div className="bg-orange-50 rounded-2xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-wider">Status</p>
          <h2 className="text-xl font-bold text-orange-700 mt-3">Validation Only</h2>
          <p className="text-xs text-orange-600 mt-2">Not a live forward forecast</p>
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