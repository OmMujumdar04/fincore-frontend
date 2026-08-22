import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function formatMonth(ds) {
  const d = new Date(ds);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatCurrency(value) {
  return `₹${(value / 100000).toFixed(2)}L`;
}

export default function ExpenseAnomalyTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE}/api/ml/anomalies/expense`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch expense anomalies");
        return r.json();
      })
      .then((json) => {
        if (cancelled) return;
        const flagged = (json.data || [])
          .filter((d) => d.anomaly_flag)
          .sort((a, b) => b.anomaly_score - a.anomaly_score);
        setRows(flagged);
        setLoading(false);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse text-gray-400">
        Loading Expense Anomalies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 rounded-2xl p-6 border border-red-200">
        Failed to load Expense Anomalies: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h3 className="text-xl font-bold mb-5">
        Expense Anomalies
      </h3>

      {rows.length === 0 ? (
        <p className="text-gray-500 text-sm">No anomalies flagged in the reliable window.</p>
      ) : (
        <table className="w-full">

          <thead className="border-b">
            <tr className="text-left">
              <th className="py-3">Month</th>
              <th>Expense</th>
              <th>Score</th>
              <th>Insight</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              const pct = row.pct_vs_baseline;
              const insight = pct !== undefined
                ? `${Math.abs(pct)}% ${pct >= 0 ? "above" : "below"} baseline`
                : "";
              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4">{formatMonth(row.ds)}</td>
                  <td>{formatCurrency(row.y)}</td>
                  <td>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {row.anomaly_score.toFixed(3)}
                    </span>
                  </td>
                  <td>{insight}</td>
                </tr>
              );
            })}
          </tbody>

        </table>
      )}

      <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-5">
        <h4 className="font-semibold text-yellow-700">
          Notebook Insight
        </h4>
        <ul className="list-disc ml-6 mt-3 space-y-2 text-sm text-gray-700">
          <li>Expense forecasting is validation only.</li>
          <li>Reliable monthly expense data ends at <b>Mar 2025</b>.</li>
          <li>March shows a genuine seasonal spike every financial year.</li>
          <li>Data after Mar 2025 has not yet been confirmed reliable.</li>
        </ul>
      </div>

    </div>
  );
}