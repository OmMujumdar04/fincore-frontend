// import { createContext, useContext, useState } from "react";

// const GrowthContext = createContext();

// export function GrowthProvider({ children }) {

//   // ===========================
//   // Base Company Revenue
//   // (Notebook Output)
//   // ===========================

//   const [baseRevenue] = useState(177136254);

//   // ===========================
//   // Goal
//   // ===========================

//   const [goalValue, setGoalValue] = useState(50);

//   const [goalUnit, setGoalUnit] = useState("Cr");

//   const [goalFY, setGoalFY] = useState("FY 2029-30");

//   // ===========================
//   // Growth Levers
//   // ===========================

//   const [attritionReduction, setAttritionReduction] = useState(10);

//   const [strikeIncrease, setStrikeIncrease] = useState(0);

//   const [dormantActivated, setDormantActivated] = useState(20);

//   return (

//     <GrowthContext.Provider
//       value={{

//         baseRevenue,

//         goalValue,
//         setGoalValue,

//         goalUnit,
//         setGoalUnit,

//         goalFY,
//         setGoalFY,

//         attritionReduction,
//         setAttritionReduction,

//         strikeIncrease,
//         setStrikeIncrease,

//         dormantActivated,
//         setDormantActivated,

//       }}
//     >

//       {children}

//     </GrowthContext.Provider>

//   );

// }

// export function useGrowth() {

//   return useContext(GrowthContext);

// }


import { createContext, useContext, useState, useEffect } from "react";

const GrowthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export function GrowthProvider({ children }) {

  const [baseRevenue, setBaseRevenue] = useState(0);
  const [baseRevenueMeta, setBaseRevenueMeta] = useState({ recent_full_fy: null, computed_at: null, loading: true });

  useEffect(() => {
    fetch(`${API_BASE}/api/growth/base-revenue`)
      .then((r) => r.json())
      .then((data) => {
        setBaseRevenue(data.revenue);
        setBaseRevenueMeta({
          recent_full_fy: data.recent_full_fy,
          computed_at: data.computed_at,
          loading: false,
        });
      })
      .catch((err) => {
        console.error("Failed to load base revenue:", err);
        setBaseRevenueMeta((m) => ({ ...m, loading: false, error: true }));
      });
  }, []);

  const [goalValue, setGoalValue] = useState(50);
  const [goalUnit, setGoalUnit] = useState("Cr");
  const [goalFY, setGoalFY] = useState("FY 2029-30");

  const [attritionReduction, setAttritionReduction] = useState(10);
  const [strikeIncrease, setStrikeIncrease] = useState(0);
  const [dormantActivated, setDormantActivated] = useState(20);

  return (
    <GrowthContext.Provider
      value={{
        baseRevenue,
        baseRevenueMeta,

        goalValue, setGoalValue,
        goalUnit, setGoalUnit,
        goalFY, setGoalFY,

        attritionReduction, setAttritionReduction,
        strikeIncrease, setStrikeIncrease,
        dormantActivated, setDormantActivated,
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
}

export function useGrowth() {
  return useContext(GrowthContext);
}