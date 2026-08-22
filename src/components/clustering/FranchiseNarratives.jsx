// import {
//   TrendingUp,
//   Award,
//   AlertTriangle,
//   Target,
//   Users,
// } from "lucide-react";

// export default function FranchiseNarratives() {
//   return (
//     <div className="space-y-6">

//       <div>

//         <h3 className="text-2xl font-bold">
//           Cluster Insights
//         </h3>

//         <p className="text-gray-500">
//           Automatically generated business observations
//         </p>

//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">

//         {/* Revenue */}

//         <div className="bg-white rounded-2xl shadow-md p-6">

//           <div className="flex items-center gap-3 mb-4">

//             <TrendingUp className="text-green-600"/>

//             <h4 className="font-semibold text-lg">
//               Revenue Concentration
//             </h4>

//           </div>

//           <p className="text-gray-600 leading-7">

//             Top Performers contribute a disproportionately large share of
//             franchise revenue despite representing only a small percentage
//             of the network.

//           </p>

//         </div>

//         {/* Established */}

//         <div className="bg-white rounded-2xl shadow-md p-6">

//           <div className="flex items-center gap-3 mb-4">

//             <Award className="text-purple-600"/>

//             <h4 className="font-semibold text-lg">
//               Established – High Value
//             </h4>

//           </div>

//           <p className="text-gray-600 leading-7">

//             This segment represents the largest opportunity for converting
//             high-value franchises into Top Performers through targeted
//             operational improvements.

//           </p>

//         </div>

//         {/* Core */}

//         <div className="bg-white rounded-2xl shadow-md p-6">

//           <div className="flex items-center gap-3 mb-4">

//             <Users className="text-blue-600"/>

//             <h4 className="font-semibold text-lg">
//               Core Network
//             </h4>

//           </div>

//           <p className="text-gray-600 leading-7">

//             Core / Established franchises form the operational backbone
//             of the organization. Small improvements across this group can
//             significantly increase total revenue.

//           </p>

//         </div>

//         {/* Burst */}

//         <div className="bg-white rounded-2xl shadow-md p-6">

//           <div className="flex items-center gap-3 mb-4">

//             <AlertTriangle className="text-yellow-600"/>

//             <h4 className="font-semibold text-lg">
//               High-Frequency Burst
//             </h4>

//           </div>

//           <p className="text-gray-600 leading-7">

//             These franchises generate frequent transactions but lower
//             revenue per bill. Pricing and conversion strategies should be
//             evaluated.

//           </p>

//         </div>

//       </div>

//       <div className="bg-bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8">

//         <div className="flex items-center gap-3 mb-4">

//           <Target />

//           <h3 className="text-2xl font-bold">
//             Strategic Recommendation
//           </h3>

//         </div>

//         <p className="leading-8 text-blue-100">

//           Focus operational coaching on the <b>Established – High Value</b>
//           cluster. These franchises already demonstrate strong revenue
//           potential and require comparatively smaller interventions to
//           transition into the Top Performer segment.

//         </p>

//       </div>

//     </div>
//   );
// }




import useFranchiseData from "../../hooks/useFranchiseData";
import {
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
} from "lucide-react";

export default function FranchiseNarratives() {

  const { data, loading } = useFranchiseData();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Loading insights...
      </div>
    );
  }

  const totalRevenue = data.reduce(
    (sum, row) => sum + Number(row.total_revenue || 0),
    0
  );

  const clusterSummary = {};

  data.forEach((row) => {
    const cluster = row.cluster_label;

    if (!clusterSummary[cluster]) {
      clusterSummary[cluster] = {
        count: 0,
        revenue: 0,
      };
    }

    clusterSummary[cluster].count++;
    clusterSummary[cluster].revenue += Number(row.total_revenue);
  });

  const revenueLeader = Object.entries(clusterSummary).sort(
    (a, b) => b[1].revenue - a[1].revenue
  )[0];

  const largestCluster = Object.entries(clusterSummary).sort(
    (a, b) => b[1].count - a[1].count
  )[0];

  const activeCount = data.filter(
    (d) => (d.status || "").toLowerCase() === "active"
  ).length;

  const insights = [
    {
      icon: <TrendingUp size={22} />,
      title: "Revenue Concentration",
      text: `${revenueLeader[0]} contributes ${(
        (revenueLeader[1].revenue / totalRevenue) *
        100
      ).toFixed(1)}% of total company revenue.`,
      color: "green",
    },

    {
      icon: <Users size={22} />,
      title: "Largest Cluster",
      text: `${largestCluster[0]} contains ${largestCluster[1].count} franchises.`,
      color: "blue",
    },

    {
      icon: <Target size={22} />,
      title: "Active Franchise Network",
      text: `${activeCount} franchises are currently Active.`,
      color: "purple",
    },

    {
      icon: <AlertTriangle size={22} />,
      title: "Growth Opportunity",
      text:
        "New / Insufficient History franchises require additional billing history before confident segmentation.",
      color: "orange",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Cluster Insights
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {insights.map((item, index) => (

          <div
            key={index}
            className="border rounded-xl p-5 bg-gray-50"
          >

            <div className="flex items-center gap-3 mb-2">

              <div
                className={`text-${item.color}-600`}
              >
                {item.icon}
              </div>

              <h3 className="font-semibold">
                {item.title}
              </h3>

            </div>

            <p className="text-gray-600">
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </div>
  );

}