// import { useGrowth } from "../../context/GrowthContext";

// export default function TargetRevenueCard() {

//   const {

//     goalValue,
//     setGoalValue,

//     goalUnit,
//     setGoalUnit,

//     goalFY,
//     setGoalFY,

//   } = useGrowth();

//   const quickGoals = [

//     {
//       title: "2× Growth",
//       value: 24,
//       unit: "Cr",
//       fy: "FY 2027-28",
//       highlight: false,
//     },

//     {
//       title: "3× Growth",
//       value: 36,
//       unit: "Cr",
//       fy: "FY 2028-29",
//       highlight: false,
//     },

//     {
//       title: "5× Growth",
//       value: 50,
//       unit: "Cr",
//       fy: "FY 2029-30",
//       highlight: true,
//     },

//   ];

//   function applyGoal(goal) {

//     setGoalValue(goal.value);
//     setGoalUnit(goal.unit);
//     setGoalFY(goal.fy);

//   }

//   return (

//     <div className="space-y-6">

//       {/* Quick Goals */}

//       <div className="grid lg:grid-cols-3 gap-5">

//         {quickGoals.map((goal) => (

//           <div
//             key={goal.title}
//             onClick={() => applyGoal(goal)}
//             className={`cursor-pointer rounded-xl border-2 p-6 transition hover:shadow-lg

//             ${
//               goal.highlight
//                 ? "border-emerald-500 bg-emerald-50"
//                 : "border-gray-200 bg-white"
//             }`}
//           >

//             <h2 className="text-2xl font-bold">

//               {goal.title}

//             </h2>

//             <p className="text-3xl font-bold text-emerald-600 mt-3">

//               ₹{goal.value} {goal.unit}

//             </p>

//             <p className="text-gray-500 mt-2">

//               by {goal.fy}

//             </p>

//           </div>

//         ))}

//       </div>

//       {/* Custom Goal */}

//       <div className="bg-white rounded-xl shadow-md p-6">

//         <h2 className="text-xl font-bold">

//           Custom Strategic Goal

//         </h2>

//         <p className="text-gray-500 mt-1">

//           Set any revenue target and financial year.

//         </p>

//         <div className="grid lg:grid-cols-3 gap-5 mt-6">

//           <div>

//             <label className="block text-sm text-gray-500 mb-2">

//               Target Revenue

//             </label>

//             <input
//               type="number"
//               value={goalValue}
//               onChange={(e) =>
//                 setGoalValue(Number(e.target.value))
//               }
//               className="w-full border rounded-lg px-4 py-3"
//             />

//           </div>

//           <div>

//             <label className="block text-sm text-gray-500 mb-2">

//               Unit

//             </label>

//             <select
//               value={goalUnit}
//               onChange={(e) =>
//                 setGoalUnit(e.target.value)
//               }
//               className="w-full border rounded-lg px-4 py-3"
//             >

//               <option value="Lakhs">

//                 Lakhs

//               </option>

//               <option value="Cr">

//                 Crores

//               </option>

//             </select>

//           </div>

//           <div>

//             <label className="block text-sm text-gray-500 mb-2">

//               Target Financial Year

//             </label>

//             <select
//               value={goalFY}
//               onChange={(e) =>
//                 setGoalFY(e.target.value)
//               }
//               className="w-full border rounded-lg px-4 py-3"
//             >

//               <option>FY 2026-27</option>

//               <option>FY 2027-28</option>

//               <option>FY 2028-29</option>

//               <option>FY 2029-30</option>

//               <option>FY 2030-31</option>

//             </select>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }




import { useGrowth } from "../../context/GrowthContext";

export default function TargetRevenueCard() {

  const {
    baseRevenue,
    baseRevenueMeta,

    goalValue, setGoalValue,
    goalUnit, setGoalUnit,
    goalFY, setGoalFY,
  } = useGrowth();

  // Derive a target FY N years out from today's real current FY —
  // never hardcoded, so this stays correct every year without editing.
  function fyYearsFromNow(years) {
    const today = new Date();
    const currentFyStart = today.getMonth() + 1 >= 4 ? today.getFullYear() : today.getFullYear() - 1;
    const targetStart = currentFyStart + years;
    return `FY ${targetStart}-${String(targetStart + 1).slice(-2)}`;
  }

  const baseCr = baseRevenue / 10000000;

  const quickGoals = [
    {
      title: "2× Growth",
      value: Number((baseCr * 2).toFixed(2)),
      unit: "Cr",
      fy: fyYearsFromNow(2),
      highlight: false,
    },
    {
      title: "3× Growth",
      value: Number((baseCr * 3).toFixed(2)),
      unit: "Cr",
      fy: fyYearsFromNow(3),
      highlight: false,
    },
    {
      title: "5× Growth",
      value: Number((baseCr * 5).toFixed(2)),
      unit: "Cr",
      fy: fyYearsFromNow(5),
      highlight: true,
    },
  ];

  function applyGoal(goal) {
    setGoalValue(goal.value);
    setGoalUnit(goal.unit);
    setGoalFY(goal.fy);
  }

  if (baseRevenueMeta.loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-gray-400">
        Loading current revenue...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Quick Goals */}

      <div className="grid lg:grid-cols-3 gap-5">

        {quickGoals.map((goal) => (

          <div
            key={goal.title}
            onClick={() => applyGoal(goal)}
            className={`cursor-pointer rounded-xl border-2 p-6 transition hover:shadow-lg

            ${
              goal.highlight
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 bg-white"
            }`}
          >

            <h2 className="text-2xl font-bold">
              {goal.title}
            </h2>

            <p className="text-3xl font-bold text-emerald-600 mt-3">
              ₹{goal.value} {goal.unit}
            </p>

            <p className="text-gray-500 mt-2">
              by {goal.fy}
            </p>

          </div>

        ))}

      </div>

      <p className="text-sm text-gray-400 px-1">
        Based on current revenue of ₹{baseCr.toFixed(2)} Cr ({baseRevenueMeta.recent_full_fy})
      </p>

      {/* Custom Goal */}

      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-bold">
          Custom Strategic Goal
        </h2>

        <p className="text-gray-500 mt-1">
          Set any revenue target and financial year.
        </p>

        <div className="grid lg:grid-cols-3 gap-5 mt-6">

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Target Revenue
            </label>
            <input
              type="number"
              value={goalValue}
              onChange={(e) => setGoalValue(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Unit
            </label>
            <select
              value={goalUnit}
              onChange={(e) => setGoalUnit(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Lakhs">Lakhs</option>
              <option value="Cr">Crores</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Target Financial Year
            </label>
            <select
              value={goalFY}
              onChange={(e) => setGoalFY(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option>{fyYearsFromNow(1)}</option>
              <option>{fyYearsFromNow(2)}</option>
              <option>{fyYearsFromNow(3)}</option>
              <option>{fyYearsFromNow(4)}</option>
              <option>{fyYearsFromNow(5)}</option>
            </select>
          </div>

        </div>

      </div>

    </div>

  );

}