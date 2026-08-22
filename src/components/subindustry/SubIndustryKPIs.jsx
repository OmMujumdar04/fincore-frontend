import useSubIndustryData from "../../hooks/useSubIndustryData";

export default function SubIndustryKPIs() {

  const { data, loading } = useSubIndustryData();

  if (loading) return null;

  const counts = {};

  const revenue = {};

  let totalRevenue = 0;

  data.forEach((row) => {

    const cluster = row.cluster_label;

    if (!counts[cluster]) {

      counts[cluster] = 0;
      revenue[cluster] = 0;

    }

    counts[cluster]++;

    revenue[cluster] += Number(row.total_revenue);

    totalRevenue += Number(row.total_revenue);

  });

  const cards = [

    {
      title: "Dominant Sub-Industries",
      value: counts["Dominant Sub-Industries"] || 0,
      share:
        (
          ((revenue["Dominant Sub-Industries"] || 0) /
            totalRevenue) *
          100
        ).toFixed(1),
      color: "border-green-500",
    },

    {
      title: "Premium (High Value/Bill)",
      value: counts["Premium (High Value/Bill)"] || 0,
      share:
        (
          ((revenue["Premium (High Value/Bill)"] || 0) /
            totalRevenue) *
          100
        ).toFixed(1),
      color: "border-orange-500",
    },

    {
      title: "Established / Core",
      value: counts["Established / Core"] || 0,
      share:
        (
          ((revenue["Established / Core"] || 0) /
            totalRevenue) *
          100
        ).toFixed(1),
      color: "border-blue-500",
    },

    {
      title: "Emerging / Niche",
      value: counts["Emerging / Niche"] || 0,
      share:
        (
          ((revenue["Emerging / Niche"] || 0) /
            totalRevenue) *
          100
        ).toFixed(1),
      color: "border-purple-500",
    },

    {
      title: "New / Insufficient Data",
      value: counts["New / Insufficient Data"] || 0,
      share:
        (
          ((revenue["New / Insufficient Data"] || 0) /
            totalRevenue) *
          100
        ).toFixed(1),
      color: "border-gray-500",
    },

  ];

  return (

    <div className="grid grid-cols-5 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`bg-white rounded-xl shadow p-5 border-l-4 ${card.color}`}
        >

          <p className="text-sm text-gray-500">

            {card.title}

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {card.value}

          </h2>

          <p className="text-sm text-gray-500 mt-2">

            {card.share}% Revenue Share

          </p>

        </div>

      ))}

    </div>

  );

}