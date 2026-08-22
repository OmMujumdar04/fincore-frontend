// export default function NxFitTable({ rows = [] }) {

//   function badge(status) {

//     if (typeof status !== "string") {
//       return "bg-gray-100 text-gray-700";
//     }

//     if (status.includes("On Pace"))
//       return "bg-green-100 text-green-700";

//     if (status.includes("Below Pace"))
//       return "bg-yellow-100 text-yellow-700";

//     if (status.includes("Off Pace"))
//       return "bg-red-100 text-red-700";

//     return "bg-gray-100 text-gray-700";
//   }

//   const validRows = rows.filter((row) => {

//     if (!row) return false;

//     if (!row.nameOfBd && !row.teamLeader)
//       return false;

//     if (typeof row.nx_fit_status !== "string")
//       return false;

//     return true;

//   });

//   return (

//     <div>

//       <h3 className="text-xl font-bold mb-5">
//         Confident (3+ usable years)
//       </h3>

//       <div className="overflow-x-auto">

//         <table className="w-full">

//           <thead className="border-b">

//             <tr className="text-left text-gray-500">

//               <th className="py-3">Name</th>

//               <th>Historical CAGR</th>

//               <th>Required CAGR</th>

//               <th>Status</th>

//             </tr>

//           </thead>

//           <tbody>

//             {validRows.map((row, index) => (

//               <tr
//                 key={index}
//                 className="border-b hover:bg-gray-50 transition"
//               >

//                 <td className="py-4 font-medium">
//                   {row.nameOfBd || row.teamLeader}
//                 </td>

//                 <td>
//                   {(Number(row.entity_cagr) * 100).toFixed(1)}%
//                 </td>

//                 <td>
//                   {(Number(row.required_cagr) * 100).toFixed(1)}%
//                 </td>

//                 <td>

//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${badge(row.nx_fit_status)}`}
//                   >
//                     {row.nx_fit_status}
//                   </span>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   );

// }




export default function NxFitTable({ rows = [] }) {

  function badge(status) {

    if (typeof status !== "string") {
      return "bg-gray-100 text-gray-700";
    }

    if (status.includes("On Pace"))
      return "bg-green-100 text-green-700";

    if (status.includes("Below Pace"))
      return "bg-yellow-100 text-yellow-700";

    if (status.includes("Off Pace"))
      return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  }

  const validRows = rows
    .filter((row) => {

      if (!row) return false;

      if (!row.nameOfBd && !row.teamLeader)
        return false;

      if (typeof row.nx_fit_status !== "string")
        return false;

      return true;

    })
    .sort((a, b) => {

      const statusOrder = {
        "On Pace": 1,
        "Below Pace": 2,
        "Off Pace": 3,
      };

      const getOrder = (status) => {

        if (status.includes("On Pace"))
          return statusOrder["On Pace"];

        if (status.includes("Below Pace"))
          return statusOrder["Below Pace"];

        if (status.includes("Off Pace"))
          return statusOrder["Off Pace"];

        return 4;

      };

      return getOrder(a.nx_fit_status) - getOrder(b.nx_fit_status);

    });

  return (

    <div>

      <h3 className="text-xl font-bold mb-5">
        Confident (3+ usable years)
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b">

            <tr className="text-left text-gray-500">

              <th className="py-3">
                Name
              </th>

              <th>
                Historical CAGR
              </th>

              <th>
                Required CAGR
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {validRows.map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-4 font-medium">
                  {row.nameOfBd || row.teamLeader}
                </td>

                <td>
                  {(Number(row.entity_cagr) * 100).toFixed(1)}%
                </td>

                <td>
                  {(Number(row.required_cagr) * 100).toFixed(1)}%
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badge(
                      row.nx_fit_status
                    )}`}
                  >
                    {row.nx_fit_status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}