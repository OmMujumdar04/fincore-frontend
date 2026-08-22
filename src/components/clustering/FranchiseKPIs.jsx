// // import { PieChart, Award, TrendingUp, Zap, Clock } from "lucide-react";

// // function FranchiseKPIs() {
// //   const cards = [
// //     {
// //       title: "Top Performer",
// //       value: "13",
// //       revenue: "₹9.34 Cr",
// //       percent: "25.9%",
// //       color: "border-green-500",
// //       icon: <Award size={22} />,
// //     },
// //     {
// //       title: "Established - High Value",
// //       value: "65",
// //       revenue: "₹15.37 Cr",
// //       percent: "42.6%",
// //       color: "border-purple-500",
// //       icon: <TrendingUp size={22} />,
// //     },
// //     {
// //       title: "Core / Established",
// //       value: "226",
// //       revenue: "₹10.21 Cr",
// //       percent: "28.3%",
// //       color: "border-blue-500",
// //       icon: <PieChart size={22} />,
// //     },
// //     {
// //       title: "High-Frequency Burst",
// //       value: "5",
// //       revenue: "₹25.2 L",
// //       percent: "0.7%",
// //       color: "border-yellow-500",
// //       icon: <Zap size={22} />,
// //     },
// //     {
// //       title: "New / Insufficient History",
// //       value: "161",
// //       revenue: "₹90.3 L",
// //       percent: "2.5%",
// //       color: "border-gray-500",
// //       icon: <Clock size={22} />,
// //     },
// //   ];

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
// //       {cards.map((card, index) => (
// //         <div
// //           key={index}
// //           className={`bg-white rounded-2xl shadow-md p-5 border-l-4 ${card.color}`}
// //         >
// //           <div className="flex justify-between items-center">

// //             <div>

// //               <p className="text-gray-500 text-sm">{card.title}</p>

// //               <h2 className="text-3xl font-bold mt-2">{card.value}</h2>

// //               <p className="mt-3 font-semibold">
// //                 {card.revenue}
// //               </p>

// //               <p className="text-sm text-gray-500">
// //                 {card.percent} of revenue
// //               </p>

// //             </div>

// //             <div className="text-gray-400">
// //               {card.icon}
// //             </div>

// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default FranchiseKPIs;


// import { useEffect, useState } from "react";
// import { Award, TrendingUp, PieChart, Zap, Clock } from "lucide-react";
// import { loadFranchiseData } from "../../utils/loadFranchiseData";

// export default function FranchiseKPIs() {

//   const [cards, setCards] = useState([]);

//   useEffect(() => {

//     async function loadData() {

//       const data = await loadFranchiseData();

//       const totalRevenue = data.reduce(
//         (sum, row) => sum + Number(row.total_revenue),
//         0
//       );

//       const clusters = [
//         {
//           title: "Top Performer",
//           color: "border-green-500",
//           icon: <Award size={22} />,
//         },
//         {
//           title: "Established – High Value",
//           color: "border-purple-500",
//           icon: <TrendingUp size={22} />,
//         },
//         {
//           title: "Core / Established",
//           color: "border-blue-500",
//           icon: <PieChart size={22} />,
//         },
//         {
//           title: "High-Frequency Burst",
//           color: "border-yellow-500",
//           icon: <Zap size={22} />,
//         },
//         {
//           title: "New / Insufficient History",
//           color: "border-gray-500",
//           icon: <Clock size={22} />,
//         },
//       ];

//       const result = clusters.map((cluster) => {

//         const rows = data.filter(
//           r => r.cluster_label === cluster.title
//         );

//         const revenue = rows.reduce(
//           (sum, r) => sum + Number(r.total_revenue),
//           0
//         );

//         return {

//           ...cluster,

//           value: rows.length,

//           revenue:

//             revenue >= 10000000

//               ? `₹${(revenue / 10000000).toFixed(2)} Cr`

//               : `₹${(revenue / 100000).toFixed(2)} L`,

//           percent:

//             ((revenue / totalRevenue) * 100).toFixed(1) + "%",

//         };

//       });

//       setCards(result);

//     }

//     loadData();

//   }, []);

//   return (

//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

//       {cards.map((card, index) => (

//         <div

//           key={index}

//           className={`bg-white rounded-2xl shadow-md border-l-4 ${card.color} p-5`}

//         >

//           <div className="flex justify-between">

//             <div>

//               <p className="text-gray-500 text-sm">

//                 {card.title}

//               </p>

//               <h2 className="text-3xl font-bold mt-2">

//                 {card.value}

//               </h2>

//               <p className="mt-3 font-semibold">

//                 {card.revenue}

//               </p>

//               <p className="text-gray-500 text-sm">

//                 {card.percent} of revenue

//               </p>

//             </div>

//             <div className="text-gray-400">

//               {card.icon}

//             </div>

//           </div>

//         </div>

//       ))}

//     </div>

//   );

// }




import { Award, TrendingUp, PieChart, Zap, Clock } from "lucide-react";
import useFranchiseData from "../../hooks/useFranchiseData";

export default function FranchiseKPIs() {
  const { data, loading } = useFranchiseData();

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading clustering data...
      </div>
    );
  }

  const totalRevenue = data.reduce(
    (sum, row) => sum + Number(row.total_revenue || 0),
    0
  );

  const clusterIcons = {
    "Top Performer": <Award size={22} />,
    "Established – High Value": <TrendingUp size={22} />,
    "Core / Established": <PieChart size={22} />,
    "High-Frequency Burst": <Zap size={22} />,
    "New / Insufficient History": <Clock size={22} />,
  };

  const clusterColors = {
    "Top Performer": "border-green-500",
    "Established – High Value": "border-purple-500",
    "Core / Established": "border-blue-500",
    "High-Frequency Burst": "border-yellow-500",
    "New / Insufficient History": "border-gray-500",
  };

  // Automatically detect all clusters present in CSV
  const uniqueClusters = [...new Set(data.map((r) => r.cluster_label))];

  const cards = uniqueClusters.map((cluster) => {
    const rows = data.filter((r) => r.cluster_label === cluster);

    const revenue = rows.reduce(
      (sum, r) => sum + Number(r.total_revenue || 0),
      0
    );

    return {
      title: cluster,
      count: rows.length,
      revenue,
      percent: ((revenue / totalRevenue) * 100).toFixed(1),
      icon: clusterIcons[cluster] || <PieChart size={22} />,
      color: clusterColors[cluster] || "border-gray-400",
    };
  });

  // Sort by revenue contribution
  cards.sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`bg-white rounded-2xl shadow-md border-l-4 ${card.color} p-5`}
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.count}
              </h2>

              <p className="mt-3 font-semibold">

                {card.revenue >= 10000000
                  ? `₹${(card.revenue / 10000000).toFixed(2)} Cr`
                  : `₹${(card.revenue / 100000).toFixed(2)} L`}

              </p>

              <p className="text-gray-500 text-sm">

                {card.percent}% of revenue

              </p>

            </div>

            <div className="text-gray-400">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}