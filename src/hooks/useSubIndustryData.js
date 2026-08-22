// import { useEffect, useState } from "react";
// import Papa from "papaparse";

// export default function useSubIndustryData() {

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     Papa.parse("/data/subindustry_clustering_GROSS_latest.csv", {

//       download: true,

//       header: true,

//       dynamicTyping: true,

//       skipEmptyLines: true,

//       complete: ({ data }) => {

//         const clean = data.filter(
//           row =>
//             row.subIndustry &&
//             row.cluster_label
//         );

//         setData(clean);
//         setLoading(false);

//       },

//     });

//   }, []);

//   return {
//     data,
//     loading,
//   };

// }


import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useSubIndustryData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/ml/clustering/subindustry`)
      .then((r) => r.json())
      .then((json) => {
        const rows = json.data || [];
        setData(rows.filter((r) => r.subIndustry && r.cluster_label));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load sub-industry clustering:", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}