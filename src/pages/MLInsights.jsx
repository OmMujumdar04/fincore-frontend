import { useState } from "react";
import useRevenueForecast from "../hooks/useRevenueForecast";
import useExpenseForecast from "../hooks/useExpenseForecast";

import RevenueKPIs from "../components/RevenueKPIs";
import RevenueForecastChart from "../components/RevenueForecastChart";

import ExpenseKPIs from "../components/ExpenseKPIs";
import ExpenseForecastChart from "../components/ExpenseForecastChart";

import RevenueAnomalyTable from "../components/RevenueAnomalyTable";
import ExpenseAnomalyTable from "../components/ExpenseAnomalyTable";

import FranchiseKPIs from "../components/clustering/FranchiseKPIs";
import FranchiseScatter from "../components/clustering/FranchiseScatter";
import FranchiseBarChart from "../components/clustering/FranchiseBarChart";
import FranchiseTable from "../components/clustering/FranchiseTable";
import FranchiseNarratives from "../components/clustering/FranchiseNarratives";
import DormantFranchiseCard from "../components/clustering/DormantFranchiseCard";

import IndustryKPIs from "../components/industry/IndustryKPIs";
import IndustryScatter from "../components/industry/IndustryScatter";
import IndustryBarChart from "../components/industry/IndustryBarChart";
import IndustryTable from "../components/industry/IndustryTable";
import IndustryNarratives from "../components/industry/IndustryNarratives";
import IndustryFootnotes from "../components/industry/IndustryFootnotes";

import SubIndustryKPIs from "../components/subindustry/SubIndustryKPIs";
import SubIndustryScatter from "../components/subindustry/SubIndustryScatter";
import SubIndustryBarChart from "../components/subindustry/SubIndustryBarChart";
import SubIndustryTable from "../components/subindustry/SubIndustryTable";
import SubIndustryNarratives from "../components/subindustry/SubIndustryNarratives";
import SubIndustryFootnotes from "../components/subindustry/SubIndustryFootnotes";

export default function MLInsights() {
  const [clusterTab, setClusterTab] = useState("franchise");

  // Live Forecasting Data from FastAPI Backend (Aiven MySQL)
  const revenueForecast = useRevenueForecast();
  const expenseForecast = useExpenseForecast();

  return (
    <div className="space-y-12">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">ML Insights</h1>
        <p className="text-gray-500 mt-2">
          Revenue Forecast • Expense Forecast • Anomaly Detection • Performance Clustering
        </p>
      </div>

      {/* ====================================================== */}
      {/* REVENUE FORECAST */}
      {/* ====================================================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Revenue Forecast</h2>
          <p className="text-gray-500 text-sm mt-1">Prophet 6-Month Projection (additive seasonality, 80% CI)</p>
        </div>

        {revenueForecast.error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            Failed to load Revenue Forecast: {revenueForecast.error}
          </div>
        )}

        <RevenueKPIs
          kpi={revenueForecast.kpi}
          computedAt={revenueForecast.computedAt}
          loading={revenueForecast.loading}
        />

        <RevenueForecastChart
          data={revenueForecast.data}
          loading={revenueForecast.loading}
          error={revenueForecast.error}
        />
      </section>

      {/* ====================================================== */}
      {/* EXPENSE FORECAST */}
      {/* ====================================================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Expense Forecast</h2>
          <p className="text-amber-600 font-medium text-sm mt-1">
            Validation Only (Trained on 24-Month Reliable Window Apr 2023 – Mar 2025)
          </p>
        </div>

        {expenseForecast.error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
            Failed to load Expense Forecast: {expenseForecast.error}
          </div>
        )}

        <ExpenseKPIs
          kpi={expenseForecast.kpi}
          computedAt={expenseForecast.computedAt}
          loading={expenseForecast.loading}
        />

        <ExpenseForecastChart
          data={expenseForecast.data}
          loading={expenseForecast.loading}
          error={expenseForecast.error}
        />
      </section>

      {/* ====================================================== */}
      {/* ANOMALY DETECTION */}
      {/* ====================================================== */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Anomaly Detection</h2>
          <p className="text-gray-500 text-sm mt-1">Isolation Forest Model (Revenue & Reliable Expense)</p>
        </div>

        <RevenueAnomalyTable />
        <ExpenseAnomalyTable />
      </section>

      {/* ====================================================== */}
      {/* PERFORMANCE CLUSTERING */}
      {/* ====================================================== */}
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Clustering Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Gross Revenue Based Segmentation (k=4)</p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setClusterTab("franchise")}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                clusterTab === "franchise" ? "bg-teal-600 text-white shadow-sm" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Franchise
            </button>

            <button
              onClick={() => setClusterTab("industry")}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                clusterTab === "industry" ? "bg-teal-600 text-white shadow-sm" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Industry
            </button>

            <button
              onClick={() => setClusterTab("subindustry")}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                clusterTab === "subindustry" ? "bg-teal-600 text-white shadow-sm" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sub Industry
            </button>
          </div>
        </div>

        {clusterTab === "franchise" && (
          <>
            <FranchiseKPIs />
            <DormantFranchiseCard />
            <div className="grid lg:grid-cols-2 gap-8">
              <FranchiseScatter />
              <FranchiseBarChart />
            </div>
            <FranchiseTable />
            <FranchiseNarratives />
          </>
        )}

        {clusterTab === "industry" && (
          <>
            <IndustryKPIs />
            <div className="grid lg:grid-cols-2 gap-8">
              <IndustryScatter />
              <IndustryBarChart />
            </div>
            <IndustryTable />
            <IndustryNarratives />
            <IndustryFootnotes />
          </>
        )}

        {clusterTab === "subindustry" && (
          <>
            <SubIndustryKPIs />
            <div className="grid lg:grid-cols-2 gap-8">
              <SubIndustryScatter />
              <SubIndustryBarChart />
            </div>
            <SubIndustryTable />
            <SubIndustryNarratives />
            <SubIndustryFootnotes />
          </>
        )}
      </section>
    </div>
  );
}