// import { useEffect, useState } from "react";
// import useGrowthTarget from "../../hooks/useGrowthTarget";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// const FLAG_COLORS = {
//   "On track for goal": "bg-emerald-100 text-emerald-800",
//   "Contributing, but below required pace": "bg-amber-100 text-amber-800",
//   "Large base, currently flat or declining — worth watching": "bg-orange-100 text-orange-800",
//   "Not currently contributing to the goal": "bg-red-100 text-red-800",
// };

// function FairShareConfidentTable({ rows, nameKey }) {
//   if (!rows || rows.length === 0) {
//     return <p className="text-gray-400 text-sm">No rows to show.</p>;
//   }
//   return (
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="text-left text-gray-500 border-b">
//           <th className="py-2 pr-2">Name</th>
//           <th className="py-2 pr-2">Trajectory</th>
//           <th className="py-2 pr-2">Actual Growth (₹)</th>
//           <th className="py-2 pr-2">Fair Share (₹)</th>
//           <th className="py-2 pr-2">Flag</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((r) => (
//           <tr key={r[nameKey]} className="border-b last:border-0">
//             <td className="py-2 pr-2 font-medium">{r[nameKey]}</td>
//             <td className="py-2 pr-2 text-gray-600">{r.trajectory ?? "—"}</td>
//             <td className={`py-2 pr-2 ${r.actual_growth_rupees < 0 ? "text-red-600" : "text-gray-800"}`}>
//               {r.actual_growth_rupees < 0 ? "-" : ""}₹{Math.abs(r.actual_growth_rupees).toLocaleString("en-IN")}
//             </td>
//             <td className="py-2 pr-2 text-gray-800">
//               ₹{Math.round(r.fair_share_rupees).toLocaleString("en-IN")}
//             </td>
//             <td className="py-2 pr-2">
//               <span className={`px-2 py-1 rounded-full text-xs ${FLAG_COLORS[r.fair_share_flag] || "bg-gray-100 text-gray-600"}`}>
//                 {r.fair_share_flag}
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// function FairShareWatchlistTable({ rows, nameKey }) {
//   if (!rows || rows.length === 0) {
//     return <p className="text-gray-400 text-sm">No rows to show.</p>;
//   }
//   return (
//     <table className="w-full text-sm">
//       <thead>
//         <tr className="text-left text-gray-500 border-b">
//           <th className="py-2 pr-2">Name</th>
//           <th className="py-2 pr-2">Trajectory</th>
//           <th className="py-2 pr-2">Recent FY Bills</th>
//           <th className="py-2 pr-2">Prior FY Bills</th>
//           <th className="py-2 pr-2">Reason</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((r) => (
//           <tr key={r[nameKey]} className="border-b last:border-0">
//             <td className="py-2 pr-2 font-medium">{r[nameKey]}</td>
//             <td className="py-2 pr-2 text-gray-600">{r.trajectory ?? "—"}</td>
//             <td className="py-2 pr-2 text-gray-600">{r.recent_fy_bills}</td>
//             <td className="py-2 pr-2 text-gray-600">{r.prior_fy_bills}</td>
//             <td className="py-2 pr-2 text-gray-500 text-xs">{r.reason}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default function FairSharePanel() {

//   const [entity, setEntity] = useState("bd");
//   const [flagFilter, setFlagFilter] = useState("all");
//   const { targetMultiplier, horizonYears, goalFY, ready } = useGrowthTarget();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!ready) return;
//     setLoading(true);
//     setError(null);
//     fetch(`${API_BASE}/api/growth/fair-share?target_multiplier=${targetMultiplier}&horizon_years=${horizonYears}`)
//       .then((r) => {
//         if (!r.ok) throw new Error("Failed to fetch fair share data");
//         return r.json();
//       })
//       .then((json) => setData(json))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [targetMultiplier, horizonYears, ready]);

//   const entityData = data ? data[entity] : null;
//   const rawConfident = entityData ? entityData.confident : [];
//   const watchlist = entityData ? entityData.watchlist : [];

//   const confidentRows = flagFilter === "all"
//     ? rawConfident
//     : rawConfident.filter((r) => r.fair_share_flag === flagFilter);

//   const nameKey = entity === "bd" ? "nameOfBd" : "teamLeader";

//   // Derived live from the data, never hardcoded — picks up any new flag automatically
//   const ALL_FLAGS = data
//     ? [...new Set([...data.bd.confident, ...data.tl.confident].map((r) => r.fair_share_flag))]
//     : [];

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mt-10">

//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-2xl font-bold">Fair Share Panel</h2>
//           <p className="text-gray-500 mt-1">Actual ₹ Growth vs. Fair Share of the Goal Gap</p>
//           {data && (
//             <p className="text-sm text-gray-400 mt-1">
//               Base ₹{(data.base_revenue / 10000000).toFixed(2)} Cr ({data.recent_full_fy}) → Target ₹
//               {(data.target_revenue / 10000000).toFixed(2)} Cr by {goalFY} — Annual Gap ₹
//               {(data.annual_gap / 100000).toFixed(2)}L, assumes even progress each year
//             </p>
//           )}
//           <p className="text-xs text-gray-400 mt-1">
//             Reflects the goal set above
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-3 mb-6 items-center flex-wrap">
//         <button
//           onClick={() => setEntity("bd")}
//           className={`px-5 py-2 rounded-lg ${entity === "bd" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//         >
//           Business Developers
//         </button>
//         <button
//           onClick={() => setEntity("tl")}
//           className={`px-5 py-2 rounded-lg ${entity === "tl" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//         >
//           Team Leaders
//         </button>

//         <select
//           value={flagFilter}
//           onChange={(e) => setFlagFilter(e.target.value)}
//           className="px-3 py-2 rounded-lg border text-sm ml-auto"
//         >
//           <option value="all">All flags</option>
//           {ALL_FLAGS.map((f) => (
//             <option key={f} value={f}>{f}</option>
//           ))}
//         </select>

//         {flagFilter !== "all" && (
//           <button
//             onClick={() => setFlagFilter("all")}
//             className="text-sm text-blue-600 underline"
//           >
//             Clear filter
//           </button>
//         )}
//       </div>

//       {!ready ? (
//         <p className="text-gray-400">Waiting for goal/base revenue to load...</p>
//       ) : loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">Failed to load: {error}</p>
//       ) : (
//         <>
//           <FairShareConfidentTable rows={confidentRows} nameKey={nameKey} />

//           <div className="mt-10">
//             <h3 className="text-lg font-semibold mb-1">Watchlist</h3>
//             <p className="text-gray-500 text-sm mb-4">
//               Too little billing history in one or both years to trust a fair-share verdict.
//             </p>
//             <FairShareWatchlistTable rows={watchlist} nameKey={nameKey} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import useGrowthTarget from "../../hooks/useGrowthTarget";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const FLAG_COLORS = {
  "On track for goal": "bg-emerald-100 text-emerald-800",
  "Contributing, but below required pace": "bg-amber-100 text-amber-800",
  "Large base, currently flat or declining — worth watching": "bg-orange-100 text-orange-800",
  "Not currently contributing to the goal": "bg-red-100 text-red-800",
};

const DEFAULT_VISIBLE_COUNT = 10;

function FairShareConfidentTable({ rows, nameKey }) {
  if (!rows || rows.length === 0) {
    return <p className="text-gray-400 text-sm">No rows to show.</p>;
  }
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b">
          <th className="py-2 pr-2">Name</th>
          <th className="py-2 pr-2">Trajectory</th>
          <th className="py-2 pr-2">Actual Growth (₹)</th>
          <th className="py-2 pr-2">Fair Share (₹)</th>
          <th className="py-2 pr-2">Flag</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={`${r[nameKey]}-${r.lifetime_rank}`} className="border-b last:border-0">
            <td className="py-2 pr-2 font-medium">{r[nameKey]}</td>
            <td className="py-2 pr-2 text-gray-600">{r.trajectory ?? "—"}</td>
            <td className={`py-2 pr-2 ${r.actual_growth_rupees < 0 ? "text-red-600" : "text-gray-800"}`}>
              {r.actual_growth_rupees < 0 ? "-" : ""}₹{Math.abs(r.actual_growth_rupees).toLocaleString("en-IN")}
            </td>
            <td className="py-2 pr-2 text-gray-800">
              ₹{Math.round(r.fair_share_rupees).toLocaleString("en-IN")}
            </td>
            <td className="py-2 pr-2">
              <span className={`px-2 py-1 rounded-full text-xs ${FLAG_COLORS[r.fair_share_flag] || "bg-gray-100 text-gray-600"}`}>
                {r.fair_share_flag}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}

function FairShareWatchlistTable({ rows, nameKey }) {
  if (!rows || rows.length === 0) {
    return <p className="text-gray-400 text-sm">No rows to show.</p>;
  }
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b">
          <th className="py-2 pr-2">Name</th>
          <th className="py-2 pr-2">Trajectory</th>
          <th className="py-2 pr-2">Recent FY Bills</th>
          <th className="py-2 pr-2">Prior FY Bills</th>
          <th className="py-2 pr-2">Reason</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={`${r[nameKey]}-${r.lifetime_rank}`} className="border-b last:border-0">
            <td className="py-2 pr-2 font-medium">{r[nameKey]}</td>
            <td className="py-2 pr-2 text-gray-600">{r.trajectory ?? "—"}</td>
            <td className="py-2 pr-2 text-gray-600">{r.recent_fy_bills}</td>
            <td className="py-2 pr-2 text-gray-600">{r.prior_fy_bills}</td>
            <td className="py-2 pr-2 text-gray-500 text-xs">{r.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const ENTITY_CONFIG = {
  bd: { label: "Business Developers", nameKey: "nameOfBd" },
  tl: { label: "Team Leaders", nameKey: "teamLeader" },
  franchise: { label: "Franchises", nameKey: "franchiseName" },
};

export default function FairSharePanel() {

  const [entity, setEntity] = useState("bd");
  const [flagFilter, setFlagFilter] = useState("all");
  const [nameSearch, setNameSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { targetMultiplier, horizonYears, goalFY, ready } = useGrowthTarget();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/growth/fair-share?target_multiplier=${targetMultiplier}&horizon_years=${horizonYears}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch fair share data");
        return r.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [targetMultiplier, horizonYears, ready]);

  // Reset local view state (search, filter, show-all) whenever the entity tab changes —
  // otherwise a franchise name search would silently carry over into the BD tab
  useEffect(() => {
    setFlagFilter("all");
    setNameSearch("");
    setShowAll(false);
  }, [entity]);

  const entityData = data ? data[entity] : null;
  const rawConfident = entityData ? entityData.confident : [];
  const watchlist = entityData ? entityData.watchlist : [];
  const { nameKey } = ENTITY_CONFIG[entity];

  let visibleRows = flagFilter === "all"
    ? rawConfident
    : rawConfident.filter((r) => r.fair_share_flag === flagFilter);

  if (nameSearch.trim() !== "") {
    const q = nameSearch.trim().toLowerCase();
    visibleRows = visibleRows.filter((r) => String(r[nameKey]).toLowerCase().includes(q));
  }

  // Default view: top 10 by lifetime_rank (rows already arrive rank-sorted from the API).
  // Any active filter or search — or explicitly clicking "Show all" — lifts the cap.
  const isFilteredView = flagFilter !== "all" || nameSearch.trim() !== "" || showAll;
  const confidentRows = isFilteredView ? visibleRows : visibleRows.slice(0, DEFAULT_VISIBLE_COUNT);
  const hiddenCount = Math.max(0, visibleRows.length - DEFAULT_VISIBLE_COUNT);

    // Derived live from the data, never hardcoded — picks up any new flag automatically.
  // Guards against a partially-shaped response (e.g. a backend error) crashing the whole page.
  const ALL_FLAGS = data?.bd?.confident && data?.tl?.confident && data?.franchise?.confident
    ? [...new Set([...data.bd.confident, ...data.tl.confident, ...data.franchise.confident].map((r) => r.fair_share_flag))]
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Fair Share Panel</h2>
          <p className="text-gray-500 mt-1">Actual ₹ Growth vs. Fair Share of the Goal Gap</p>
          {data && (
            <p className="text-sm text-gray-400 mt-1">
              Base ₹{(data.base_revenue / 10000000).toFixed(2)} Cr ({data.recent_full_fy}) → Target ₹
              {(data.target_revenue / 10000000).toFixed(2)} Cr by {goalFY} — Annual Gap ₹
              {(data.annual_gap / 100000).toFixed(2)}L, assumes even progress each year
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">Reflects the goal set above</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6 items-center flex-wrap">
        {Object.entries(ENTITY_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setEntity(key)}
            className={`px-5 py-2 rounded-lg ${entity === key ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {cfg.label}
          </button>
        ))}

        <input
          type="text"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          placeholder={`Search ${ENTITY_CONFIG[entity].label.toLowerCase()}...`}
          className="px-3 py-2 rounded-lg border text-sm ml-auto w-56"
        />

        <select
          value={flagFilter}
          onChange={(e) => setFlagFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm"
        >
          <option value="all">All flags</option>
          {ALL_FLAGS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        {(flagFilter !== "all" || nameSearch.trim() !== "" || showAll) && (
          <button
            onClick={() => { setFlagFilter("all"); setNameSearch(""); setShowAll(false); }}
            className="text-sm text-blue-600 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {!ready ? (
        <p className="text-gray-400">Waiting for goal/base revenue to load...</p>
      ) : loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load: {error}</p>
      ) : (
        <>
          {!isFilteredView && (
            <p className="text-xs text-gray-400 mb-2">
              Showing top {Math.min(DEFAULT_VISIBLE_COUNT, visibleRows.length)} by lifetime rank
              {hiddenCount > 0 && ` — ${hiddenCount} more available via search or filters`}
            </p>
          )}

          <FairShareConfidentTable rows={confidentRows} nameKey={nameKey} />

          {!isFilteredView && hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              Show all {visibleRows.length}
            </button>
          )}

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-1">Watchlist</h3>
            <p className="text-gray-500 text-sm mb-4">
              Too little billing history in one or both years to trust a fair-share verdict.
              {entity === "franchise" && " Most franchises fall here by default — thin, bursty billing history is normal at this scale, not a data problem."}
            </p>
            <FairShareWatchlistTable rows={watchlist} nameKey={nameKey} />
          </div>
        </>
      )}
    </div>
  );
}