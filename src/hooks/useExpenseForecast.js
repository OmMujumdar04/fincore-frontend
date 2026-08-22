import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useExpenseForecast() {
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState(null);
  const [computedAt, setComputedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [timeseriesRes, summaryRes] = await Promise.all([
          fetch(`${API_BASE}/api/ml/forecast/expense`),
          fetch(`${API_BASE}/api/ml/forecast/expense/summary`),
        ]);

        if (!timeseriesRes.ok || !summaryRes.ok) {
          throw new Error("Failed to fetch expense forecast data");
        }

        const timeseriesJson = await timeseriesRes.json();
        const summaryJson = await summaryRes.json();

        if (!cancelled) {
          setData(timeseriesJson.data || []);
          setKpi(summaryJson.kpi || null);
          setComputedAt(timeseriesJson.computed_at || summaryJson.computed_at);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, kpi, computedAt, loading, error };
}
