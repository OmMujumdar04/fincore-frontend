import { useState, useMemo } from "react";
import useSubIndustryData from "../../hooks/useSubIndustryData";

export default function SubIndustryTable() {
  const { data, loading } = useSubIndustryData();

  const [cluster, setCluster] = useState("All");

  // Get cluster list
  const clusters = useMemo(() => {
    return [
      "All",
      ...new Set(
        data
          .map((d) => d.cluster_label)
          .filter((d) => d && d !== "")
      ),
    ];
  }, [data]);

  // Filter + sort table
  const filteredData = useMemo(() => {
    let rows = [...data];

    if (cluster !== "All") {
      rows = rows.filter(
        (r) => r.cluster_label === cluster
      );
    }

    rows.sort(
      (a, b) =>
        Number(b.total_revenue) -
        Number(a.total_revenue)
    );

    return rows.slice(0, 10);
  }, [cluster, data]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Loading Sub-Industry Table...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">
            Top Revenue Generating Sub-Industries
          </h2>

          <p className="text-gray-500 text-sm">
            Filter by Cluster
          </p>

        </div>

        <select
          value={cluster}
          onChange={(e) => setCluster(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >

          {clusters.map((c) => (

            <option key={c}>
              {c}
            </option>

          ))}

        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-100">

              <th className="text-left p-3">Sub Industry</th>

              <th className="text-left p-3">
                Revenue
              </th>

              <th className="text-left p-3">
                Bills
              </th>

              <th className="text-left p-3">
                Avg/Bill
              </th>

              <th className="text-left p-3">
                Franchises
              </th>

              <th className="text-left p-3">
                Cluster
              </th>

              <th className="text-left p-3">
                Flag
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredData.map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {row.subIndustry}
                </td>

                <td className="p-3">
                  ₹{(Number(row.total_revenue) / 100000).toFixed(2)}L
                </td>

                <td className="p-3">
                  {row.total_bills}
                </td>

                <td className="p-3">
                  ₹{Math.round(
                    Number(row.avg_revenue_per_bill)
                  )}
                </td>

                <td className="p-3">
                  {row.unique_franchises}
                </td>

                <td className="p-3">
                  {row.cluster_label}
                </td>

                <td className="p-3">

                  {row.low_confidence ? (

                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">

                      Low Confidence

                    </span>

                  ) : (

                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">

                      OK

                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}