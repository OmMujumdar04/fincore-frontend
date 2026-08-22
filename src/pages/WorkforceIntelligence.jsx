import { useState } from "react";
import useFranchiseReadiness from "../hooks/useFranchiseReadiness";
import useBdTlReadiness from "../hooks/useBdTlReadiness";
import FranchiseReadinessKPIs from "../components/workforce/FranchiseReadinessKPIs";
import FranchiseReadinessBarChart from "../components/workforce/FranchiseReadinessBarChart";
import FranchiseReadinessTable from "../components/workforce/FranchiseReadinessTable";
import BdTlReadinessKPIs from "../components/workforce/BdTlReadinessKPIs";
import BdTlReadinessTable from "../components/workforce/BdTlReadinessTable";
import ReadinessGlossary from "../components/workforce/ReadinessGlossary";

export default function WorkforceIntelligence() {
  const [entityTab, setEntityTab] = useState("franchise");
  const [basis, setBasis] = useState("gross");

  const franchiseData = useFranchiseReadiness(basis);
  const bdData = useBdTlReadiness("bd");
  const tlData = useBdTlReadiness("tl");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Workforce Intelligence</h1>
        <p className="text-gray-500 mt-2">Franchise, BD, and TL Readiness — Trajectory, Momentum, and Scale</p>
      </div>

      <div className="flex gap-3">
        {["franchise", "bd", "tl"].map((tab) => (
          <button
            key={tab}
            onClick={() => setEntityTab(tab)}
            className={`px-5 py-2 rounded-lg transition ${
              entityTab === tab ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab === "franchise" ? "Franchise" : tab.toUpperCase()}
          </button>
        ))}
      </div>

      <ReadinessGlossary />

      {entityTab === "franchise" && (
        <>
          <div className="flex gap-3">
            <button
              onClick={() => setBasis("net")}
              className={`px-5 py-2 rounded-lg transition ${basis === "net" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Net Revenue
            </button>
            <button
              onClick={() => setBasis("gross")}
              className={`px-5 py-2 rounded-lg transition ${basis === "gross" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Gross Revenue
            </button>
          </div>

          {franchiseData.error && (
            <div className="bg-red-50 text-red-700 rounded-xl p-4">Failed to load: {franchiseData.error}</div>
          )}

          <FranchiseReadinessKPIs {...franchiseData} />
          <FranchiseReadinessBarChart summary={franchiseData.summary} loading={franchiseData.loading} />
          <FranchiseReadinessTable data={franchiseData.data} loading={franchiseData.loading} />
        </>
      )}

      {entityTab === "bd" && (
        <>
          {bdData.error && <div className="bg-red-50 text-red-700 rounded-xl p-4">Failed to load: {bdData.error}</div>}
          <BdTlReadinessKPIs {...bdData} label="BD" />
          <BdTlReadinessTable data={bdData.data} loading={bdData.loading} nameField="bd_name" nameLabel="BD" />
        </>
      )}

      {entityTab === "tl" && (
        <>
          {tlData.error && <div className="bg-red-50 text-red-700 rounded-xl p-4">Failed to load: {tlData.error}</div>}
          <BdTlReadinessKPIs {...tlData} label="TL" />
          <BdTlReadinessTable data={tlData.data} loading={tlData.loading} nameField="tl_name" nameLabel="TL" />
        </>
      )}
    </div>
  );
}