// import { useMemo, useState } from "react";

// const franchiseData = [
//   {
//     name: "Aastha Kalakar",
//     revenue: 11935118,
//     bills: 55,
//     cluster: "Top Performer",
//     status: "Active",
//   },
//   {
//     name: "Sitalaxmi",
//     revenue: 10696825,
//     bills: 52,
//     cluster: "Top Performer",
//     status: "Active",
//   },
//   {
//     name: "Pooja Acharya",
//     revenue: 9377060,
//     bills: 49,
//     cluster: "Top Performer",
//     status: "Active",
//   },
//   {
//     name: "PV Ramesh",
//     revenue: 6274565,
//     bills: 38,
//     cluster: "Established - High Value",
//     status: "Active",
//   },
//   {
//     name: "Praveen",
//     revenue: 5947525,
//     bills: 37,
//     cluster: "Established - High Value",
//     status: "Active",
//   },
//   {
//     name: "Mehernosh",
//     revenue: 5937208,
//     bills: 36,
//     cluster: "Established - High Value",
//     status: "Active",
//   },
//   {
//     name: "Demo Franchise",
//     revenue: 2500000,
//     bills: 22,
//     cluster: "Core / Established",
//     status: "Inactive",
//   },
// ];

// export default function FranchiseTable() {
//   const [status, setStatus] = useState("All");
//   const [cluster, setCluster] = useState("All");

//   const rows = useMemo(() => {
//     let data = [...franchiseData];

//     if (status !== "All") {
//       data = data.filter((d) => d.status === status);
//     }

//     if (cluster !== "All") {
//       data = data.filter((d) => d.cluster === cluster);
//     }

//     return data.sort((a, b) => b.revenue - a.revenue).slice(0, 10);
//   }, [status, cluster]);

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6">

//       <div className="flex justify-between items-center mb-6">

//         <div>

//           <h3 className="text-xl font-bold">
//             Top 10 Revenue Generating Franchises
//           </h3>

//           <p className="text-gray-500">
//             Filter by Status & Cluster
//           </p>

//         </div>

//         <div className="flex gap-3">

//           <select
//             className="border rounded-lg px-3 py-2"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option>All</option>
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>

//           <select
//             className="border rounded-lg px-3 py-2"
//             value={cluster}
//             onChange={(e) => setCluster(e.target.value)}
//           >
//             <option>All</option>
//             <option>Top Performer</option>
//             <option>Established - High Value</option>
//             <option>Core / Established</option>
//             <option>High-Frequency Burst</option>
//             <option>New / Insufficient History</option>
//           </select>

//         </div>

//       </div>

//       <table className="w-full">

//         <thead className="border-b">

//           <tr className="text-left">

//             <th className="py-3">Franchise</th>

//             <th>Revenue</th>

//             <th>Bills</th>

//             <th>Cluster</th>

//             <th>Status</th>

//           </tr>

//         </thead>

//         <tbody>

//           {rows.map((row, index) => (

//             <tr
//               key={index}
//               className="border-b hover:bg-gray-50"
//             >

//               <td className="py-4 font-medium">
//                 {row.name}
//               </td>

//               <td>
//                 ₹{(row.revenue / 100000).toFixed(2)} L
//               </td>

//               <td>
//                 {row.bills}
//               </td>

//               <td>
//                 {row.cluster}
//               </td>

//               <td>

//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     row.status === "Active"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {row.status}
//                 </span>

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

import { useState, useMemo } from "react";
import useFranchiseData from "../../hooks/useFranchiseData";

export default function FranchiseTable() {
  const { data, loading } = useFranchiseData();

  const [status, setStatus] = useState("All");
  const [cluster, setCluster] = useState("All");

  // Get unique status values
  const statuses = useMemo(() => {
    return [
      "All",
      ...new Set(
        data
          .map((d) => (d.status || "").trim())
          .filter((s) => s !== "")
      ),
    ];
  }, [data]);

  // Get unique cluster values
  const clusters = useMemo(() => {
    return [
      "All",
      ...new Set(data.map((d) => d.cluster_label)),
    ];
  }, [data]);

  // Filter table
  const filteredData = useMemo(() => {
    let rows = [...data];

    if (status !== "All") {
      rows = rows.filter((r) => (r.status || "").trim() === status);
    }

    if (cluster !== "All") {
      rows = rows.filter((r) => r.cluster_label === cluster);
    }

    rows.sort(
      (a, b) =>
        Number(b.total_revenue) - Number(a.total_revenue)
    );

    return rows.slice(0, 10);
  }, [data, status, cluster]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Loading franchise table...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold">
            Top 10 Revenue Generating Franchises
          </h2>
          <p className="text-gray-500 text-sm">
            Filter by Status & Cluster
          </p>
        </div>

        <div className="flex gap-3">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={cluster}
            onChange={(e) => setCluster(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {clusters.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

        </div>

      </div>

      <table className="w-full border-collapse">

        <thead>

          <tr className="border-b bg-gray-100">

            <th className="text-left p-3">Franchise</th>
            <th className="text-left p-3">Revenue</th>
            <th className="text-left p-3">Bills</th>
            <th className="text-left p-3">Cluster</th>
            <th className="text-left p-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {filteredData.map((row, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">
                {row.franchiseName}
              </td>

              <td className="p-3">
                ₹{(Number(row.total_revenue) / 100000).toFixed(2)}L
              </td>

              <td className="p-3">
                {row.total_bills}
              </td>

              <td className="p-3">
                {row.cluster_label}
              </td>

              <td className="p-3">

                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    row.status === "active"
                      ? "bg-green-100 text-green-700"
                      : row.status === "inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {row.status || "N/A"}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}