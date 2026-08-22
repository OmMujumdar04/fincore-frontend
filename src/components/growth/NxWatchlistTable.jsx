export default function NxWatchlistTable({ rows }) {

  function badge(status) {

    if (status.includes("Turnaround"))
      return "bg-blue-100 text-blue-700";

    if (status.includes("Insufficient"))
      return "bg-gray-100 text-gray-700";

    if (status.includes("Off Pace"))
      return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";

  }

  return (

    <div>

      <h3 className="text-xl font-bold mb-5">

        Watchlist (Limited Historical Data)

      </h3>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b">

            <tr className="text-left text-gray-500">

              <th className="py-3">

                Name

              </th>

              <th>

                Usable Years

              </th>

              <th>

                Status

              </th>

              <th>

                Reason

              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-4 font-medium">

                  {row.nameOfBd || row.teamLeader}

                </td>

                <td>

                  {row.usable_years}

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

                <td className="text-gray-600">

                  {row.reason}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}