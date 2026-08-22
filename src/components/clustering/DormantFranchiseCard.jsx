import { useEffect, useState } from "react";

export default function DormantFranchiseCard() {

  const [franchises, setFranchises] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(true);
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  useEffect(() => {
  fetch(`${API_BASE}/api/ml/clustering/dormant-franchises`)
    .then((r) => r.json())
    .then((json) => {
      setFranchises(json.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error loading dormant franchises:", err);
      setLoading(false);
    });
}, []);

  function formatHeader(header) {

    return header
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  }

  return (

    <>

      {/* KPI CARD */}

      <div className="bg-white rounded-xl shadow-md p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-gray-500 text-sm font-medium">

              Dormant Active Franchises

            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">

              {loading ? "—" : franchises.length}

            </h2>

            <p className="text-gray-500 text-sm mt-2">

              Active franchises with no billing activity

            </p>

          </div>

          <div className="bg-orange-100 rounded-full p-3">

            <span className="text-2xl">

              ⚠️

            </span>

          </div>

        </div>

        <button
          type="button"
          onClick={() => setShowTable(true)}
          disabled={loading || franchises.length === 0}
          className="mt-5 w-full px-4 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >

          View Dormant Franchises

        </button>

      </div>


      {/* DORMANT FRANCHISE TABLE MODAL */}

      {showTable && (

        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowTable(false)}
        >

          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-6 border-b">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Dormant Active Franchises

                </h2>

                <p className="text-gray-500 mt-1">

                  {franchises.length} active franchises with no billing activity

                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowTable(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl px-2"
                aria-label="Close dormant franchises table"
              >

                ×

              </button>

            </div>


            {/* TABLE */}

            <div className="overflow-auto p-6">

              <table className="w-full text-sm border-collapse">

                <thead className="sticky top-0 bg-gray-100">

                  <tr>

                    {Object.keys(franchises[0] || {}).map(
                      (column) => (

                        <th
                          key={column}
                          className="px-4 py-3 text-left font-semibold text-gray-600 border-b whitespace-nowrap"
                        >

                          {formatHeader(column)}

                        </th>

                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {franchises.map((franchise, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-orange-50 transition"
                    >

                      {Object.keys(franchises[0] || {}).map(
                        (column) => (

                          <td
                            key={column}
                            className="px-4 py-3 text-gray-700 whitespace-nowrap"
                          >

                            {franchise[column] || "—"}

                          </td>

                        )
                      )}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* MODAL FOOTER */}

            <div className="flex justify-end p-4 border-t">

              <button
                type="button"
                onClick={() => setShowTable(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}