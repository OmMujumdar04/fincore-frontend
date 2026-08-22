// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const data = [
//   { name: "Aastha Kalakar", x: 1.2, y: 11935118, cluster: "Top Performer" },
//   { name: "Sitalaxmi", x: 1.8, y: 10696825, cluster: "Top Performer" },
//   { name: "Pooja Acharya", x: 2.5, y: 9377060, cluster: "Top Performer" },

//   { name: "PV Ramesh", x: 1.3, y: 6274565, cluster: "Established" },
//   { name: "Praveen", x: 1.1, y: 5947525, cluster: "Established" },
//   { name: "Mehernosh", x: 1.4, y: 5937208, cluster: "Established" },

//   { name: "Core A", x: 0.8, y: 800000, cluster: "Core" },
//   { name: "Core B", x: 1.1, y: 1200000, cluster: "Core" },
//   { name: "Core C", x: 0.9, y: 950000, cluster: "Core" },
//   { name: "Core D", x: 1.5, y: 1700000, cluster: "Core" },

//   { name: "Burst A", x: 4.3, y: 250000, cluster: "Burst" },
//   { name: "Burst B", x: 5.1, y: 420000, cluster: "Burst" },
//   { name: "Burst C", x: 8.2, y: 850000, cluster: "Burst" },
// ];

// const colors = {
//   "Top Performer": "#10b981",
//   Established: "#8b5cf6",
//   Core: "#3b82f6",
//   Burst: "#f59e0b",
// };

// function CustomTooltip({ active, payload }) {
//   if (!active || !payload || !payload.length) return null;

//   const p = payload[0].payload;

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-3 border">
//       <p className="font-semibold">{p.name}</p>
//       <p>Bills / Month : {p.x}</p>
//       <p>Revenue : ₹{(p.y / 100000).toFixed(2)} L</p>
//       <p>{p.cluster}</p>
//     </div>
//   );
// }

// export default function FranchiseScatter() {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6">

//       <h3 className="text-xl font-bold mb-1">
//         Franchise Performance Clusters
//       </h3>

//       <p className="text-gray-500 mb-6">
//         Revenue vs Billing Frequency
//       </p>

//       <ResponsiveContainer width="100%" height={520}>

//         <ScatterChart>

//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis
//             type="number"
//             dataKey="x"
//             name="Bills"
//             label={{
//               value: "Bills per Month",
//               position: "insideBottom",
//               offset: -5,
//             }}
//           />

//           <YAxis
//             type="number"
//             dataKey="y"
//             tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
//             label={{
//               value: "Revenue",
//               angle: -90,
//               position: "insideLeft",
//             }}
//           />

//           <Tooltip content={<CustomTooltip />} />

//           <Legend />

//           {Object.keys(colors).map((cluster) => (
//             <Scatter
//               key={cluster}
//               name={cluster}
//               data={data.filter((d) => d.cluster === cluster)}
//               fill={colors[cluster]}
//             />
//           ))}

//         </ScatterChart>

//       </ResponsiveContainer>

//     </div>
//   );
// }


import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import useFranchiseData from "../../hooks/useFranchiseData";

const colors = {
  "Top Performer": "#16a34a",
  "Established – High Value": "#9333ea",
  "Core / Established": "#2563eb",
  "High-Frequency Burst": "#f59e0b",
  "New / Insufficient History": "#9ca3af",
};

function CustomTooltip({ active, payload }) {

  if (!active || !payload || !payload.length) return null;

  const p = payload[0].payload;

  return (

    <div className="bg-white border rounded-lg shadow-lg p-4">

      <h4 className="font-semibold">

        {p.franchiseName}

      </h4>

      <p>

        Revenue :
        ₹{(p.total_revenue/100000).toFixed(2)} L

      </p>

      <p>

        Bills / Month :
        {Number(p.bills_per_month).toFixed(2)}

      </p>

      <p>

        Bills :
        {p.total_bills}

      </p>

      <p>

        {p.cluster_label}

      </p>

    </div>

  );

}

export default function FranchiseScatter() {

  const { data, loading } = useFranchiseData();

  if (loading) {

    return (

      <div className="bg-white rounded-xl p-8 shadow">

        Loading...

      </div>

    );

  }

  const clusters = [...new Set(data.map(d => d.cluster_label))];

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h3 className="text-xl font-bold">

        Franchise Performance Distribution

      </h3>

      <p className="text-gray-500 mb-5">

        Gross Revenue vs Bills per Month

      </p>

      <ResponsiveContainer width="100%" height={550}>

        <ScatterChart>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis
            type="number"
            dataKey="bills_per_month"
            name="Bills"
            label={{
              value:"Bills per Month",
              position:"insideBottom",
              offset:-5
            }}
          />

          <YAxis
            type="number"
            dataKey="total_revenue"
            tickFormatter={(v)=>
              `₹${(v/100000).toFixed(0)}L`
            }
            label={{
              value:"Gross Revenue",
              angle:-90,
              position:"insideLeft"
            }}
          />

          <Tooltip content={<CustomTooltip/>}/>

          <Legend/>

          {

            clusters.map(cluster=>(

              <Scatter

                key={cluster}

                name={cluster}

                data={
                  data.filter(
                    d=>d.cluster_label===cluster
                  )
                }

                fill={colors[cluster] || "#64748b"}

              />

            ))

          }

        </ScatterChart>

      </ResponsiveContainer>

    </div>

  );

}