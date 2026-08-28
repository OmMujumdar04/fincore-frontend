// import { useEffect, useState } from "react";
// import NxFitTable from "./NxFitTable";
// import NxWatchlistTable from "./NxWatchlistTable";
// import useGrowthTarget from "../../hooks/useGrowthTarget";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// const DEFAULT_VISIBLE_COUNT = 10;

// const ENTITY_CONFIG = {
//   bd: { label: "Business Developers" },
//   tl: { label: "Team Leaders" },
//   franchise: { label: "Franchises" },
// };

// export default function NxFitPanel() {

//   const [entity, setEntity] = useState("bd");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [showAllConfident, setShowAllConfident] = useState(false);
//   const [showAllWatchlist, setShowAllWatchlist] = useState(false);
//   const { targetMultiplier, horizonYears, goalFY, ready } = useGrowthTarget();

//   const [confidentRows, setConfidentRows] = useState([]);
//   const [watchRows, setWatchRows] = useState([]);
//   const [meta, setMeta] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!ready) return;
//     setLoading(true);
//     fetch(`${API_BASE}/api/growth/nx-fit/${entity}?target_multiplier=${targetMultiplier}&horizon_years=${horizonYears}`)
//       .then((r) => r.json())
//       .then((data) => {
//         setConfidentRows(data.confident || []);
//         setWatchRows(data.watchlist || []);
//         setMeta({
//           required_cagr: data.required_cagr,
//           target_fy: data.target_fy,
//           target_revenue: data.target_revenue,
//         });
//       })
//       .catch((err) => console.error("Nx-Fit fetch failed:", err))
//       .finally(() => setLoading(false));
//   }, [entity, targetMultiplier, horizonYears, ready]);

//   // Reset local view state whenever the entity tab changes
//   useEffect(() => {
//     setStatusFilter("all");
//     setShowAllConfident(false);
//     setShowAllWatchlist(false);
//   }, [entity]);

//   const getName = (r) => r.nameOfBd || r.teamLeader || r.franchiseName;

//   // Status filter applies to both tables — derived live, never hardcoded
//   const ALL_STATUSES = [...new Set([...confidentRows, ...watchRows].map((r) => r.nx_fit_status))];

//   const filteredConfident = statusFilter === "all"
//     ? confidentRows
//     : confidentRows.filter((r) => r.nx_fit_status === statusFilter);

//   const filteredWatchlist = statusFilter === "all"
//     ? watchRows
//     : watchRows.filter((r) => r.nx_fit_status === statusFilter);

//   // Default sort: confident by entity_cagr desc (strongest first), watchlist by usable_years desc
//   const sortedConfident = [...filteredConfident].sort((a, b) => (b.entity_cagr ?? -Infinity) - (a.entity_cagr ?? -Infinity));
//   const sortedWatchlist = [...filteredWatchlist].sort((a, b) => (b.usable_years ?? 0) - (a.usable_years ?? 0));

//   const isFilteredView = statusFilter !== "all";

//   const visibleConfident = (isFilteredView || showAllConfident)
//     ? sortedConfident
//     : sortedConfident.slice(0, DEFAULT_VISIBLE_COUNT);
//   const visibleWatchlist = (isFilteredView || showAllWatchlist)
//     ? sortedWatchlist
//     : sortedWatchlist.slice(0, DEFAULT_VISIBLE_COUNT);

//   const hiddenConfidentCount = Math.max(0, sortedConfident.length - DEFAULT_VISIBLE_COUNT);
//   const hiddenWatchlistCount = Math.max(0, sortedWatchlist.length - DEFAULT_VISIBLE_COUNT);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 mt-10">

//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h2 className="text-2xl font-bold">Nx-Fit Panel</h2>
//           <p className="text-gray-500 mt-1">Historical CAGR vs Required CAGR</p>
//           {meta && (
//             <p className="text-sm text-gray-400 mt-1">
//               Target: {targetMultiplier.toFixed(2)}x by {meta.target_fy} — Required CAGR: {(meta.required_cagr * 100).toFixed(1)}%
//             </p>
//           )}
//           <p className="text-xs text-gray-400 mt-1">
//             Reflects the goal set above — {goalFY}
//           </p>
//         </div>
//       </div>

//       <div className="flex gap-3 mb-6 items-center flex-wrap">
//         {Object.entries(ENTITY_CONFIG).map(([key, cfg]) => (
//           <button
//             key={key}
//             onClick={() => setEntity(key)}
//             className={`px-5 py-2 rounded-lg ${entity === key ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//           >
//             {cfg.label}
//           </button>
//         ))}

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-3 py-2 rounded-lg border text-sm ml-auto"
//         >
//           <option value="all">All statuses</option>
//           {ALL_STATUSES.map((s) => (
//             <option key={s} value={s}>{s}</option>
//           ))}
//         </select>

//         {statusFilter !== "all" && (
//           <button
//             onClick={() => setStatusFilter("all")}
//             className="text-sm text-blue-600 underline"
//           >
//             Clear filter
//           </button>
//         )}
//       </div>

//       {!ready || loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : (
//         <>
//           {!isFilteredView && (
//             <p className="text-xs text-gray-400 mb-2">
//               Showing top {Math.min(DEFAULT_VISIBLE_COUNT, sortedConfident.length)} by historical CAGR
//               {hiddenConfidentCount > 0 && !showAllConfident && ` — ${hiddenConfidentCount} more available`}
//             </p>
//           )}

//           <NxFitTable rows={visibleConfident} entity={entity} />

//           {!isFilteredView && hiddenConfidentCount > 0 && !showAllConfident && (
//             <button
//               onClick={() => setShowAllConfident(true)}
//               className="mt-3 text-sm text-blue-600 underline"
//             >
//               Show all {sortedConfident.length}
//             </button>
//           )}

//           <div className="mt-10">
//             {!isFilteredView && (
//               <p className="text-xs text-gray-400 mb-2">
//                 Showing top {Math.min(DEFAULT_VISIBLE_COUNT, sortedWatchlist.length)} by usable years
//                 {hiddenWatchlistCount > 0 && !showAllWatchlist && ` — ${hiddenWatchlistCount} more available`}
//               </p>
//             )}

//             <NxWatchlistTable rows={visibleWatchlist} entity={entity} />

//             {!isFilteredView && hiddenWatchlistCount > 0 && !showAllWatchlist && (
//               <button
//                 onClick={() => setShowAllWatchlist(true)}
//                 className="mt-3 text-sm text-blue-600 underline"
//               >
//                 Show all {sortedWatchlist.length}
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import NxFitTable from "./NxFitTable";
import NxWatchlistTable from "./NxWatchlistTable";
import useGrowthTarget from "../../hooks/useGrowthTarget";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const DEFAULT_VISIBLE_COUNT = 10;

const ENTITY_CONFIG = {
  bd: { label: "Business Developers" },
  tl: { label: "Team Leaders" },
  franchise: { label: "Franchises" },
};

export default function NxFitPanel() {

  const [entity, setEntity] = useState("bd");
  const [statusFilter, setStatusFilter] = useState("all");
  const [nameSearch, setNameSearch] = useState("");
  const [showAllConfident, setShowAllConfident] = useState(false);
  const [showAllWatchlist, setShowAllWatchlist] = useState(false);
  const { targetMultiplier, horizonYears, goalFY, ready } = useGrowthTarget();

  const [confidentRows, setConfidentRows] = useState([]);
  const [watchRows, setWatchRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    fetch(`${API_BASE}/api/growth/nx-fit/${entity}?target_multiplier=${targetMultiplier}&horizon_years=${horizonYears}`)
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
  }, [entity, targetMultiplier, horizonYears, ready]);

  // Reset local view state whenever the entity tab changes —
  // otherwise a franchise name search would silently carry over into the BD tab
  useEffect(() => {
    setStatusFilter("all");
    setNameSearch("");
    setShowAllConfident(false);
    setShowAllWatchlist(false);
  }, [entity]);

  const getName = (r) => r.nameOfBd || r.teamLeader || r.franchiseName;

  // Status filter derived live from whatever statuses actually appear — never hardcoded
  const ALL_STATUSES = [...new Set([...confidentRows, ...watchRows].map((r) => r.nx_fit_status))];

  let filteredConfident = statusFilter === "all"
    ? confidentRows
    : confidentRows.filter((r) => r.nx_fit_status === statusFilter);

  let filteredWatchlist = statusFilter === "all"
    ? watchRows
    : watchRows.filter((r) => r.nx_fit_status === statusFilter);

  if (nameSearch.trim() !== "") {
    const q = nameSearch.trim().toLowerCase();
    filteredConfident = filteredConfident.filter((r) => String(getName(r)).toLowerCase().includes(q));
    filteredWatchlist = filteredWatchlist.filter((r) => String(getName(r)).toLowerCase().includes(q));
  }

  // Default sort: confident by entity_cagr desc (strongest first), watchlist by usable_years desc
  const sortedConfident = [...filteredConfident].sort((a, b) => (b.entity_cagr ?? -Infinity) - (a.entity_cagr ?? -Infinity));
  const sortedWatchlist = [...filteredWatchlist].sort((a, b) => (b.usable_years ?? 0) - (a.usable_years ?? 0));

  const isFilteredView = statusFilter !== "all" || nameSearch.trim() !== "";

  const visibleConfident = (isFilteredView || showAllConfident)
    ? sortedConfident
    : sortedConfident.slice(0, DEFAULT_VISIBLE_COUNT);
  const visibleWatchlist = (isFilteredView || showAllWatchlist)
    ? sortedWatchlist
    : sortedWatchlist.slice(0, DEFAULT_VISIBLE_COUNT);

  const hiddenConfidentCount = Math.max(0, sortedConfident.length - DEFAULT_VISIBLE_COUNT);
  const hiddenWatchlistCount = Math.max(0, sortedWatchlist.length - DEFAULT_VISIBLE_COUNT);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Nx-Fit Panel</h2>
          <p className="text-gray-500 mt-1">Historical CAGR vs Required CAGR</p>
          {meta && (
            <p className="text-sm text-gray-400 mt-1">
              Target: {targetMultiplier.toFixed(2)}x by {meta.target_fy} — Required CAGR: {(meta.required_cagr * 100).toFixed(1)}%
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Reflects the goal set above — {goalFY}
          </p>
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm"
        >
          <option value="all">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {(statusFilter !== "all" || nameSearch.trim() !== "") && (
          <button
            onClick={() => { setStatusFilter("all"); setNameSearch(""); }}
            className="text-sm text-blue-600 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {!ready || loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          {!isFilteredView && (
            <p className="text-xs text-gray-400 mb-2">
              Showing top {Math.min(DEFAULT_VISIBLE_COUNT, sortedConfident.length)} by historical CAGR
              {hiddenConfidentCount > 0 && !showAllConfident && ` — ${hiddenConfidentCount} more available via search or filters`}
            </p>
          )}

          <NxFitTable rows={visibleConfident} entity={entity} />

          {!isFilteredView && hiddenConfidentCount > 0 && !showAllConfident && (
            <button
              onClick={() => setShowAllConfident(true)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              Show all {sortedConfident.length}
            </button>
          )}

          <div className="mt-10">
            {!isFilteredView && (
              <p className="text-xs text-gray-400 mb-2">
                Showing top {Math.min(DEFAULT_VISIBLE_COUNT, sortedWatchlist.length)} by usable years
                {hiddenWatchlistCount > 0 && !showAllWatchlist && ` — ${hiddenWatchlistCount} more available via search or filters`}
              </p>
            )}

            <NxWatchlistTable rows={visibleWatchlist} entity={entity} />

            {!isFilteredView && hiddenWatchlistCount > 0 && !showAllWatchlist && (
              <button
                onClick={() => setShowAllWatchlist(true)}
                className="mt-3 text-sm text-blue-600 underline"
              >
                Show all {sortedWatchlist.length}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}