// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Cell,
// } from "recharts";

// const data = [
//   {
//     cluster: "Top Performer",
//     count: 13,
//     color: "#10b981",
//   },
//   {
//     cluster: "Established - High Value",
//     count: 65,
//     color: "#8b5cf6",
//   },
//   {
//     cluster: "Core / Established",
//     count: 226,
//     color: "#3b82f6",
//   },
//   {
//     cluster: "High-Frequency Burst",
//     count: 5,
//     color: "#f59e0b",
//   },
//   {
//     cluster: "New / Insufficient History",
//     count: 161,
//     color: "#9ca3af",
//   },
// ];

// export default function FranchiseBarChart() {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6">

//       <h3 className="text-xl font-bold mb-1">
//         Franchise Count by Cluster
//       </h3>

//       <p className="text-gray-500 mb-6">
//         Total Franchises : 470
//       </p>

//       <ResponsiveContainer width="100%" height={420}>

//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 20,
//             left: 10,
//             bottom: 60,
//           }}
//         >

//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis
//             dataKey="cluster"
//             angle={-12}
//             textAnchor="end"
//             interval={0}
//           />

//           <YAxis />

//           <Tooltip />

//           <Bar
//             dataKey="count"
//             radius={[8, 8, 0, 0]}
//           >

//             {data.map((entry, index) => (
//               <Cell
//                 key={index}
//                 fill={entry.color}
//               />
//             ))}

//           </Bar>

//         </BarChart>

//       </ResponsiveContainer>

//     </div>
//   );
// }



import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import useFranchiseData from "../../hooks/useFranchiseData";

const colors = {
  "Top Performer": "#16a34a",
  "Established – High Value": "#9333ea",
  "Core / Established": "#2563eb",
  "High-Frequency Burst": "#f59e0b",
  "New / Insufficient History": "#9ca3af",
};

export default function FranchiseBarChart() {

  const { data, loading } = useFranchiseData();

  if (loading) {

    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        Loading...
      </div>
    );

  }

  const counts = {};

  data.forEach((row) => {

    const cluster = row.cluster_label;

    counts[cluster] = (counts[cluster] || 0) + 1;

  });

  const chartData = Object.keys(counts).map((cluster) => ({
    cluster,
    count: counts[cluster],
    color: colors[cluster] || "#64748b",
  }));

  chartData.sort((a, b) => b.count - a.count);

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h3 className="text-xl font-bold">
        Franchise Distribution by Cluster
      </h3>

      <p className="text-gray-500 mb-6">

        Total Franchises : {data.length}

      </p>

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 70,
          }}
        >

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis
            dataKey="cluster"
            interval={0}
            angle={-15}
            textAnchor="end"
          />

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="count"
            radius={[8,8,0,0]}
          >

            {

              chartData.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))

            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}