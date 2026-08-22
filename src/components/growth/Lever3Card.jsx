import { useGrowth } from "../../context/GrowthContext";
import useGrowthCalculator from "../../hooks/useGrowthCalculator";

export default function Lever3Card() {

  const {
    dormantActivated,
    setDormantActivated,
  } = useGrowth();

  const {
    projectedRevenue,
    dormantRevenue,
    MAX_DORMANT,
  } = useGrowthCalculator();

  function formatCurrency(value) {

    if (value >= 10000000)
      return `₹${(value / 10000000).toFixed(2)} Cr`;

    return `₹${(value / 100000).toFixed(2)} L`;

  }

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold">
        Lever 3
      </h2>

      <p className="text-gray-500">
        Dormant Franchise Activation
      </p>

      <div className="mt-8">

        <div className="flex justify-between">

          <span>
            Activate Franchises
          </span>

          <span className="font-bold">
            {dormantActivated}
          </span>

        </div>

        <input
          type="range"
          min="0"
          max={MAX_DORMANT}
          step="1"
          value={dormantActivated}
          onChange={(e) =>
            setDormantActivated(Number(e.target.value))
          }
          className="w-full mt-3"
        />

      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-5">

        <p className="text-gray-500">
          Additional Revenue
        </p>

        <h2 className="text-3xl font-bold text-blue-700 mt-2">
          {formatCurrency(dormantRevenue)}
        </h2>

      </div>

      <div className="mt-6 bg-green-50 rounded-xl p-5">

        <p className="text-gray-500">
          Projected Company Revenue
        </p>

        <h2 className="text-3xl font-bold text-green-700 mt-2">
          {formatCurrency(projectedRevenue)}
        </h2>

      </div>

      <div className="mt-8 border-t pt-5">

        <h3 className="font-semibold">
          Recommendation
        </h3>

        <p className="text-gray-600 mt-2">
          Activating dormant franchises increases the active
          franchise base and contributes directly towards the
          selected growth target.
        </p>

      </div>

    </div>

  );

}