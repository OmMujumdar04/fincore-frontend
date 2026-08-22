// import { useGrowth } from "../context/GrowthContext";

// export default function useGrowthCalculator() {

//   const {

//     baseRevenue,

//     goalValue,
//     goalUnit,

//     attritionReduction,

//     dormantActivated,

//   } = useGrowth();

//   // =====================================
//   // NOTEBOOK CONSTANTS
//   // =====================================

//   const TOTAL_ACTIVE_FRANCHISES = 186;

//   const AVG_DEPARTED_REVENUE = 20521;

//   const AVG_ACTIVATED_REVENUE = 25298;

//   const MAX_DORMANT = 54;

//   // =====================================
//   // LEVER 1
//   // =====================================

//   const attritionRevenue =

//     (attritionReduction / 100) *

//     TOTAL_ACTIVE_FRANCHISES *

//     AVG_DEPARTED_REVENUE;

//   // =====================================
//   // LEVER 3
//   // =====================================

//   const dormantRevenue =

//     dormantActivated *

//     AVG_ACTIVATED_REVENUE;

//   // =====================================
//   // TOTAL
//   // =====================================

//   const projectedRevenue =

//     baseRevenue +

//     attritionRevenue +

//     dormantRevenue;

//   const totalLeverRevenue =

//     attritionRevenue +

//     dormantRevenue;

//   // =====================================
//   // GOAL
//   // =====================================

//   const goalRevenue =

//     goalUnit === "Cr"

//       ? goalValue * 10000000

//       : goalValue * 100000;

//   const remainingGap =

//     Math.max(

//       goalRevenue -

//       projectedRevenue,

//       0

//     );

//   const progress =

//     Math.min(

//       (projectedRevenue / goalRevenue) * 100,

//       100

//     );

//   return {

//     TOTAL_ACTIVE_FRANCHISES,

//     MAX_DORMANT,

//     AVG_DEPARTED_REVENUE,

//     AVG_ACTIVATED_REVENUE,

//     attritionRevenue,

//     dormantRevenue,

//     totalLeverRevenue,

//     projectedRevenue,

//     remainingGap,

//     progress,

//     goalRevenue,

//   };

// }





import { useState, useEffect } from "react";
import { useGrowth } from "../context/GrowthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useGrowthCalculator() {

  const {
    baseRevenue,
    goalValue,
    goalUnit,
    attritionReduction,
    dormantActivated,
    strikeIncrease,
  } = useGrowth();

  const [lever1, setLever1] = useState(null);
  const [lever2, setLever2] = useState(null);
  const [lever3, setLever3] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/growth/lever1`).then((r) => r.json()),
      fetch(`${API_BASE}/api/growth/lever2`).then((r) => r.json()),
      fetch(`${API_BASE}/api/growth/lever3`).then((r) => r.json()),
    ])
      .then(([l1, l2, l3]) => {
        setLever1(l1);
        setLever2(l2);
        setLever3(l3);
      })
      .catch((err) => console.error("Failed to load lever inputs:", err))
      .finally(() => setLoading(false));
  }, []);

  // =====================================
  // LEVER 1 — live inputs
  // =====================================
  const attritionRevenue = lever1
    ? (attritionReduction / 100) * lever1.total_active_franchises * lever1.avg_departed_revenue
    : 0;

  // =====================================
  // LEVER 2 — live inputs (Strike Ratio)
  // =====================================
  const strikeRatioRevenue = lever2
    ? (strikeIncrease / 100) * lever2.total_enquiries_recent_fy * lever2.avg_revenue_per_bill
    : 0;

  // =====================================
  // LEVER 3 — live inputs
  // =====================================
  const dormantRevenue = lever3
    ? dormantActivated * lever3.avg_activated_revenue_recent_fy
    : 0;

  // =====================================
  // TOTAL
  // =====================================
  const totalLeverRevenue = attritionRevenue + strikeRatioRevenue + dormantRevenue;
  const projectedRevenue = baseRevenue + totalLeverRevenue;

  const goalRevenue = goalUnit === "Cr" ? goalValue * 10000000 : goalValue * 100000;
  const remainingGap = Math.max(goalRevenue - projectedRevenue, 0);
  const progress = goalRevenue > 0 ? Math.min((projectedRevenue / goalRevenue) * 100, 100) : 0;

  return {
    loading,

    // live-fetched raw inputs, exposed for display/debugging
    MAX_DORMANT: lever3?.max_dormant_available ?? 0,
    TOTAL_ACTIVE_FRANCHISES: lever1?.total_active_franchises ?? 0,
    AVG_DEPARTED_REVENUE: lever1?.avg_departed_revenue ?? 0,
    AVG_ACTIVATED_REVENUE: lever3?.avg_activated_revenue_recent_fy ?? 0,
    CURRENT_STRIKE_RATIO: lever2?.current_strike_ratio ?? 0,

    attritionRevenue,
    strikeRatioRevenue,
    dormantRevenue,

    totalLeverRevenue,
    projectedRevenue,
    remainingGap,
    progress,
    goalRevenue,
  };
}