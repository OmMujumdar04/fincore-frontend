import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export default function BdTlReadinessTable({ data, loading, nameField, nameLabel }) {
  const [sortKey, setSortKey] = useState("lifetime_rank");
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");
  const [flagFilter, setFlagFilter] = useState("All");
  const [trajectoryFilter, setTrajectoryFilter] = useState("All");
  const [momentumFilter, setMomentumFilter] = useState("All");

  if (loading) {
    return <div className="bg-white rounded-2xl shadow-md p-8">Loading...</div>;
  }

  function handleSort(key) {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const flagOptions = ["All", ...new Set(data.map((r) => r.readiness_flag))].sort();
  const trajectoryOptions = [
    "All",
    ...new Set(data.map((r) => r.trajectory).filter((t) => t !== null)),
  ].sort();
  const momentumOptions = [
  "All",
  ...new Set(data.map((r) => r.momentum_status).filter((m) => m !== null)),
].sort();

  const filtered = data.filter((row) => {
  const matchesSearch = row[nameField].toLowerCase().includes(search.toLowerCase());
  const matchesFlag = flagFilter === "All" || row.readiness_flag === flagFilter;
  const matchesTrajectory = trajectoryFilter === "All" || row.trajectory === trajectoryFilter;
  const matchesMomentum = momentumFilter === "All" || row.momentum_status === momentumFilter;
  return matchesSearch && matchesFlag && matchesTrajectory && matchesMomentum;
});

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;
    if (typeof valA === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  const columns = [
    { key: nameField, label: nameLabel },
    { key: "lifetime_revenue", label: "Lifetime Revenue" },
    { key: "lifetime_rank", label: "Rank" },
    { key: "trajectory", label: "Trajectory" },
    { key: "momentum_status", label: "Momentum" },
    { key: "readiness_flag", label: "Readiness Flag" },
  ];

  function SortIcon({ colKey }) {
    if (sortKey !== colKey) return <ChevronsUpDown size={14} className="inline ml-1 text-gray-300" />;
    return sortAsc
      ? <ChevronUp size={14} className="inline ml-1 text-teal-600" />
      : <ChevronDown size={14} className="inline ml-1 text-teal-600" />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h3 className="text-xl font-bold">{nameLabel} Readiness Table</h3>
        <input
          type="text"
          placeholder={`Search ${nameLabel.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select value={flagFilter} onChange={(e) => setFlagFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
          {flagOptions.map((opt) => (
            <option key={opt} value={opt}>{opt === "All" ? "All Readiness Flags" : opt}</option>
          ))}
        </select>

        <select value={trajectoryFilter} onChange={(e) => setTrajectoryFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
          {trajectoryOptions.map((opt) => (
            <option key={opt} value={opt}>{opt === "All" ? "All Trajectories" : opt}</option>
          ))}
        </select>

        <select value={momentumFilter} onChange={(e) => setMomentumFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
  {momentumOptions.map((opt) => (
    <option key={opt} value={opt}>{opt === "All" ? "All Momentum" : opt}</option>
  ))}
</select>

        {(flagFilter !== "All" || trajectoryFilter !== "All" || momentumFilter !== "All" || search) && (
  <button
    onClick={() => { setFlagFilter("All"); setTrajectoryFilter("All"); setMomentumFilter("All"); setSearch(""); }}
    className="text-sm text-teal-600 hover:underline px-2"
  >
    Clear filters
  </button>
)}
      </div>

      <div className="overflow-x-auto max-h-150 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b">
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)} className="text-left py-3 px-3 cursor-pointer hover:text-teal-600 select-none">
                  {col.label}
                  <SortIcon colKey={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row[nameField]} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{row[nameField]}</td>
                <td className="py-2 px-3">
                  {row.lifetime_revenue !== null ? `₹${row.lifetime_revenue.toLocaleString("en-IN")}` : "—"}
                </td>
                <td className="py-2 px-3">{row.lifetime_rank ?? "—"}</td>
                <td className="py-2 px-3">{row.trajectory ?? "—"}</td>
                <td className="py-2 px-3">{row.momentum_status ?? "—"}</td>
                <td className="py-2 px-3">{row.readiness_flag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">Showing {sorted.length} of {data.length}</p>
    </div>
  );
}