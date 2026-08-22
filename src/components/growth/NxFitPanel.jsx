// import { useEffect, useState } from "react";
// import Papa from "papaparse";

// import NxFitTable from "./NxFitTable";
// import NxWatchlistTable from "./NxWatchlistTable";

// export default function NxFitPanel() {

//   const [entity, setEntity] = useState("BD");
//   const [target, setTarget] = useState("3x");

//   const [confidentRows, setConfidentRows] = useState([]);
//   const [watchRows, setWatchRows] = useState([]);

//   useEffect(() => {

//     const confidentFile =
//       entity === "BD"
//         ? "/data/bd_nx_fit_confident.csv"
//         : "/data/tl_nx_fit_confident.csv";

//     const watchFile =
//       entity === "BD"
//         ? "/data/bd_nx_fit_watchlist.csv"
//         : "/data/tl_nx_fit_watchlist.csv";

//     Papa.parse(confidentFile, {

//       download: true,
//       header: true,

//       complete: ({ data }) => {

//         const cleaned = data.filter(row => {

//           return (
//             row &&
//             (row.nameOfBd || row.teamLeader) &&
//             row.nx_fit_status &&
//             row.entity_cagr !== ""
//           );

//         });

//         console.log("CONFIDENT", cleaned);

//         setConfidentRows(cleaned);

//       }

//     });

//     Papa.parse(watchFile, {

//       download: true,
//       header: true,

//       complete: ({ data }) => {

//         const cleaned = data.filter(row => {

//           return (
//             row &&
//             (row.nameOfBd || row.teamLeader)
//           );

//         });

//         console.log("WATCH", cleaned);

//         setWatchRows(cleaned);

//       }

//     });

//   }, [entity]);

//   return (

//     <div className="bg-white rounded-xl shadow-md p-6 mt-10">

//       <div className="flex justify-between items-center mb-8">

//         <div>

//           <h2 className="text-2xl font-bold">
//             Nx-Fit Panel
//           </h2>

//           <p className="text-gray-500 mt-1">
//             Historical CAGR vs Required CAGR
//           </p>

//         </div>

//         <div className="flex gap-2">

//           {["2x", "3x", "5x"].map((x) => (

//             <button
//               key={x}
//               onClick={() => setTarget(x)}
//               className={`px-4 py-2 rounded-lg border transition ${
//                 target === x
//                   ? "bg-emerald-600 text-white"
//                   : "bg-white"
//               }`}
//             >
//               {x.toUpperCase()}
//             </button>

//           ))}

//         </div>

//       </div>

//       <div className="flex gap-3 mb-6">

//         <button
//           onClick={() => setEntity("BD")}
//           className={`px-5 py-2 rounded-lg ${
//             entity === "BD"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Business Developers
//         </button>

//         <button
//           onClick={() => setEntity("TL")}
//           className={`px-5 py-2 rounded-lg ${
//             entity === "TL"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Team Leaders
//         </button>

//       </div>

//       <NxFitTable rows={confidentRows} />

//       <div className="mt-10">

//         <NxWatchlistTable rows={watchRows} />

//       </div>

//     </div>

//   );

// }





import { useEffect, useState } from "react";
import NxFitTable from "./NxFitTable";
import NxWatchlistTable from "./NxWatchlistTable";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function NxFitPanel() {

  const [entity, setEntity] = useState("bd");
  const [targetMultiplier, setTargetMultiplier] = useState(3);

  const [confidentRows, setConfidentRows] = useState([]);
  const [watchRows, setWatchRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/growth/nx-fit/${entity}?target_multiplier=${targetMultiplier}&horizon_years=5`)
      .then((r) => r.json())
      .then((data) => {
        setConfidentRows(data.confident || []);
        setWatchRows(data.watchlist || []);
        setMeta({
          required_cagr: data.required_cagr,
          target_fy: data.target_fy,
          target_revenue: data.target_revenue,
        });
      })
      .catch((err) => console.error("Nx-Fit fetch failed:", err))
      .finally(() => setLoading(false));
  }, [entity, targetMultiplier]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Nx-Fit Panel</h2>
          <p className="text-gray-500 mt-1">Historical CAGR vs Required CAGR</p>
          {meta && (
            <p className="text-sm text-gray-400 mt-1">
              Target: {targetMultiplier}x by {meta.target_fy} — Required CAGR: {(meta.required_cagr * 100).toFixed(1)}%
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {[2, 3, 5].map((x) => (
            <button
              key={x}
              onClick={() => setTargetMultiplier(x)}
              className={`px-4 py-2 rounded-lg border transition ${
                targetMultiplier === x ? "bg-emerald-600 text-white" : "bg-white"
              }`}
            >
              {x}X
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setEntity("bd")}
          className={`px-5 py-2 rounded-lg ${entity === "bd" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Business Developers
        </button>
        <button
          onClick={() => setEntity("tl")}
          className={`px-5 py-2 rounded-lg ${entity === "tl" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Team Leaders
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          <NxFitTable rows={confidentRows} entity={entity} />
          <div className="mt-10">
            <NxWatchlistTable rows={watchRows} entity={entity} />
          </div>
        </>
      )}
    </div>
  );
}