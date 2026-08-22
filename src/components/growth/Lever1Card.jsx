import { useGrowth } from "../../context/GrowthContext";
import useGrowthCalculator from "../../hooks/useGrowthCalculator";

export default function Lever1Card() {

  const {
    attritionReduction,
    setAttritionReduction,
  } = useGrowth();

  const {
    attritionRevenue,
    projectedRevenue,
  } = useGrowthCalculator();

  function formatCurrency(value) {

    if (value >= 10000000)
      return `₹${(value / 10000000).toFixed(2)} Cr`;

    return `₹${(value / 100000).toFixed(2)} L`;

  }

  return (

    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold">

        Lever 1

      </h2>

      <p className="text-gray-500">

        Franchise Attrition Reduction

      </p>

      <div className="mt-8">

        <div className="flex justify-between">

          <span>

            Improve Attrition

          </span>

          <span className="font-bold">

            {attritionReduction}%

          </span>

        </div>

        <input

          type="range"

          min="0"

          max="100"

          step="1"

          value={attritionReduction}

          onChange={(e)=>

            setAttritionReduction(

              Number(e.target.value)

            )

          }

          className="w-full mt-3"

        />

      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-5">

        <p className="text-gray-500">

          Additional Revenue

        </p>

        <h2 className="text-3xl font-bold mt-2 text-blue-700">

          {formatCurrency(attritionRevenue)}

        </h2>

      </div>

      <div className="mt-6 bg-green-50 rounded-xl p-5">

        <p className="text-gray-500">

          Projected Company Revenue

        </p>

        <h2 className="text-3xl font-bold mt-2 text-green-700">

          {formatCurrency(projectedRevenue)}

        </h2>

      </div>

      <div className="mt-8 border-t pt-5">

        <h3 className="font-semibold">

          Recommendation

        </h3>

        <p className="text-gray-600 mt-2">

          Reducing franchise attrition increases retained
          franchise revenue and contributes directly
          towards achieving the selected revenue goal.

        </p>

      </div>

    </div>

  );

}