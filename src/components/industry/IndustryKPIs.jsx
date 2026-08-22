import useIndustryData from "../../hooks/useIndustryData";

export default function IndustryKPIs() {

    const { data, loading } = useIndustryData();

    if (loading)
        return null;

    const clusters = {};

    data.forEach(row => {

        if (!clusters[row.cluster_label])
            clusters[row.cluster_label] = 0;

        clusters[row.cluster_label]++;

    });

    const cards = [

        {
            title: "Dominant Industries",
            value: clusters["Dominant Industries"] || 0,
            color: "border-green-500"
        },

        {
            title: "Premium (High Value/Bill)",
            value: clusters["Premium (High Value/Bill)"] || 0,
            color: "border-orange-500"
        },

        {
            title: "Established / Core",
            value: clusters["Established / Core"] || 0,
            color: "border-blue-500"
        },

        {
            title: "Emerging / Niche",
            value: clusters["Emerging / Niche"] || 0,
            color: "border-purple-500"
        },

        {
            title: "New / Insufficient Data",
            value: clusters["New / Insufficient Data"] || 0,
            color: "border-gray-500"
        }

    ];

    return (

        <div className="grid grid-cols-5 gap-5">

            {cards.map(card => (

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

                </div>

            ))}

        </div>

    );

}