// import { useEffect, useState } from "react";
// import { loadFranchiseData } from "../utils/loadFranchiseData";

// export default function useFranchiseData() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const rows = await loadFranchiseData();

//       // remove completely empty rows
//       const cleaned = rows.filter(
//         (r) => r.franchiseName && r.cluster_label
//       );

//       setData(cleaned);
//       setLoading(false);
//     }

//     fetchData();
//   }, []);

//   return { data, loading };
// }


import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useFranchiseData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/ml/clustering/franchise`)
      .then((r) => r.json())
      .then((json) => {
        const rows = json.data || [];
        setData(rows.filter((r) => r.franchiseName && r.cluster_label));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load franchise clustering:", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}