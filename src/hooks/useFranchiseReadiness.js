import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useFranchiseReadiness(basis = "gross") {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [computedAt, setComputedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [fullRes, summaryRes] = await Promise.all([
          fetch(`${API_BASE}/api/franchise-readiness/${basis}`),
          fetch(`${API_BASE}/api/franchise-readiness/${basis}/summary`),
        ]);

        if (!fullRes.ok || !summaryRes.ok) {
          throw new Error("Failed to fetch franchise readiness data");
        }

        const fullJson = await fullRes.json();
        const summaryJson = await summaryRes.json();

        if (!cancelled) {
          setData(fullJson.data);
          setSummary(summaryJson.flag_counts);
          setComputedAt(fullJson.computed_at);
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
  }, [basis]);

  return { data, summary, computedAt, loading, error };
}