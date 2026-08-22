// import { useEffect, useState } from "react";

// export default function useIndustryData() {

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         fetch("/data/industry_clustering_GROSS_latest.csv")
//             .then(res => res.text())
//             .then(async text => {

//                 const Papa = (await import("papaparse")).default;

//                 const parsed = Papa.parse(text, {
//                     header: true,
//                     dynamicTyping: true,
//                     skipEmptyLines: true
//                 });

//                 setData(parsed.data);
//                 setLoading(false);

//             });

//     }, []);

//     return { data, loading };

// }


import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useIndustryData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/ml/clustering/industry`)
      .then((r) => r.json())
      .then((json) => {
        setData(json.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load industry clustering:", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}