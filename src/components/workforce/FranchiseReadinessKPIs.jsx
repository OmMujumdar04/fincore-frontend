export default function FranchiseReadinessKPIs({ data, summary, computedAt, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        Loading...
      </div>
    );
  }

  const total = data.length;
  const topFlags = [...summary].sort((a, b) => b.count - a.count).slice(0, 4);

  const formattedTime = computedAt
    ? new Date(computedAt).toLocaleString()
    : "—";

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400">
        Data as of {formattedTime}
      </p>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">Total Franchises</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{total}</p>
        </div>

        {topFlags.map((flag) => (
          <div key={flag.readiness_flag} className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">{flag.readiness_flag}</p>
            <p className="text-3xl font-bold text-teal-600 mt-1">{flag.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}