import { useMemo, useState } from "react";
import useIndustryData from "../../hooks/useIndustryData";

export default function IndustryTable() {

  const { data, loading } = useIndustryData();

  const [cluster, setCluster] = useState("All");

  const clusters = useMemo(() => {

    return [
      "All",
      ...new Set(data.map(d => d.cluster_label))
    ];

  }, [data]);

  const tableData = useMemo(() => {

    let rows = [...data];

    if (cluster !== "All") {
      rows = rows.filter(
        r => r.cluster_label === cluster
      );
    }

    rows.sort(
      (a,b)=>
        Number(b.total_revenue)-
        Number(a.total_revenue)
    );

    return rows;

  },[data,cluster]);

  if(loading)
    return null;

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-xl font-bold">

            Industry Cluster Table

          </h2>

          <p className="text-gray-500">

            Filter by Cluster

          </p>

        </div>

        <select
          className="border rounded-lg px-4 py-2"
          value={cluster}
          onChange={(e)=>setCluster(e.target.value)}
        >

          {clusters.map(c=>

            <option key={c}>
              {c}
            </option>

          )}

        </select>

      </div>

      <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-3">Industry</th>

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

        {

          tableData.map((row,index)=>(

            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">
                {row.industry}
              </td>

              <td className="p-3">

                ₹{(row.total_revenue/100000).toFixed(2)}L

              </td>

              <td className="p-3">

                {row.total_bills}

              </td>

              <td className="p-3">

                ₹{Math.round(row.avg_revenue_per_bill)}

              </td>

              <td className="p-3">

                {row.unique_franchises}

              </td>

              <td className="p-3">

                {row.cluster_label}

              </td>

              <td className="p-3">

                {

                  row.low_confidence ?

                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">

                    Low Confidence

                  </span>

                  :

                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">

                    OK

                  </span>

                }

              </td>

            </tr>

          ))

        }

        </tbody>

      </table>

      </div>

    </div>

  );

}