// import useGrowthCalculator from "../../hooks/useGrowthCalculator";
// import { useGrowth } from "../../context/GrowthContext";

// export default function CombinedRevenueCard() {

//   const {

//     baseRevenue,
//     goalFY,

//   } = useGrowth();

//   const {

//     attritionRevenue,
//     dormantRevenue,
//     totalLeverRevenue,
//     projectedRevenue,
//     goalRevenue,
//     remainingGap,
//     progress,

//   } = useGrowthCalculator();

//   function formatCurrency(value) {

//     if (value >= 10000000)
//       return `₹${(value / 10000000).toFixed(2)} Cr`;

//     return `₹${(value / 100000).toFixed(2)} L`;

//   }

//   return (

//     <div className="space-y-6">

//       <div className="bg-white rounded-xl shadow-md p-6">

//         <h2 className="text-2xl font-bold">

//           Growth Projection

//         </h2>

//         <div className="flex justify-between items-center mt-2">

//   <p className="text-gray-500">

//     Target FY : {goalFY}

//   </p>

//   <p className="font-semibold text-emerald-600">

//     Goal : {formatCurrency(goalRevenue)}

//   </p>

// </div>

//         <div className="grid md:grid-cols-4 gap-5 mt-6">

//           <div className="rounded-lg bg-blue-50 p-5">

//             <p className="text-gray-500 text-sm">

//               Current Revenue

//             </p>

//             <h3 className="text-2xl font-bold mt-2">

//               {formatCurrency(baseRevenue)}

//             </h3>

//           </div>

//           <div className="rounded-lg bg-green-50 p-5">

//             <p className="text-gray-500 text-sm">

//               Lever Revenue

//             </p>

//             <h3 className="text-2xl font-bold mt-2">

//               {formatCurrency(totalLeverRevenue)}

//             </h3>

//           </div>

//           <div className="rounded-lg bg-purple-50 p-5">

//             <p className="text-gray-500 text-sm">

//               Projected Revenue

//             </p>

//             <h3 className="text-2xl font-bold mt-2">

//               {formatCurrency(projectedRevenue)}

//             </h3>

//           </div>

//           <div className="rounded-lg bg-orange-50 p-5">

//             <p className="text-gray-500 text-sm">

//               Remaining Gap

//             </p>

//             <h3 className="text-2xl font-bold mt-2">

//               {formatCurrency(remainingGap)}

//             </h3>

//           </div>

//         </div>

//       </div>

//       <div className="bg-white rounded-xl shadow-md p-6">

//         <div className="flex justify-between mb-3">

//           <span className="font-semibold">

//             Goal Progress

//           </span>

//           <span className="font-bold">

//             {progress.toFixed(1)}%

//           </span>

//         </div>

//         <div className="w-full bg-gray-200 rounded-full h-4">

//           <div
//             className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
//             style={{
//               width: `${progress}%`,
//             }}
//           />

//         </div>

//         <div className="grid md:grid-cols-3 gap-5 mt-8">

//           <div>

//             <p className="text-gray-500">

//               Attrition Impact

//             </p>

//             <h3 className="font-bold text-lg mt-2">

//               {formatCurrency(attritionRevenue)}

//             </h3>

//           </div>

//           <div>

//             <p className="text-gray-500">

//               Dormant Activation

//             </p>

//             <h3 className="font-bold text-lg mt-2">

//               {formatCurrency(dormantRevenue)}

//             </h3>

//           </div>

//           <div>

//             <p className="text-gray-500">

//               Target Revenue

//             </p>

//             <h3 className="font-bold text-lg mt-2">

//               {formatCurrency(goalRevenue)}

//             </h3>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }




import useGrowthCalculator from "../../hooks/useGrowthCalculator";
import { useGrowth } from "../../context/GrowthContext";

export default function CombinedRevenueCard() {

  const { baseRevenue, goalFY } = useGrowth();

  const {
    attritionRevenue,
    strikeRatioRevenue,
    dormantRevenue,
    totalLeverRevenue,
    projectedRevenue,
    goalRevenue,
    remainingGap,
    progress,
  } = useGrowthCalculator();

  function formatCurrency(value) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold">Growth Projection</h2>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500">Target FY : {goalFY}</p>
          <p className="font-semibold text-emerald-600">Goal : {formatCurrency(goalRevenue)}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-6">
          <div className="rounded-lg bg-blue-50 p-5">
            <p className="text-gray-500 text-sm">Current Revenue</p>
            <h3 className="text-2xl font-bold mt-2">{formatCurrency(baseRevenue)}</h3>
          </div>
          <div className="rounded-lg bg-green-50 p-5">
            <p className="text-gray-500 text-sm">Lever Revenue</p>
            <h3 className="text-2xl font-bold mt-2">{formatCurrency(totalLeverRevenue)}</h3>
          </div>
          <div className="rounded-lg bg-purple-50 p-5">
            <p className="text-gray-500 text-sm">Projected Revenue</p>
            <h3 className="text-2xl font-bold mt-2">{formatCurrency(projectedRevenue)}</h3>
          </div>
          <div className="rounded-lg bg-orange-50 p-5">
            <p className="text-gray-500 text-sm">Remaining Gap</p>
            <h3 className="text-2xl font-bold mt-2">{formatCurrency(remainingGap)}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between mb-3">
          <span className="font-semibold">Goal Progress</span>
          <span className="font-bold">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-8">
          <div>
            <p className="text-gray-500">Attrition Impact</p>
            <h3 className="font-bold text-lg mt-2">{formatCurrency(attritionRevenue)}</h3>
          </div>
          <div>
            <p className="text-gray-500">Strike Ratio Impact</p>
            <h3 className="font-bold text-lg mt-2">{formatCurrency(strikeRatioRevenue)}</h3>
          </div>
          <div>
            <p className="text-gray-500">Dormant Activation</p>
            <h3 className="font-bold text-lg mt-2">{formatCurrency(dormantRevenue)}</h3>
          </div>
          <div>
            <p className="text-gray-500">Target Revenue</p>
            <h3 className="font-bold text-lg mt-2">{formatCurrency(goalRevenue)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}