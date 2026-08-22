import useIndustryData from "../../hooks/useIndustryData";

export default function IndustryNarratives() {

    const { data, loading } = useIndustryData();

    if (loading) return null;

    const revenueLeader = [...data].sort(
        (a,b)=>b.total_revenue-a.total_revenue
    )[0];

    const premium = data.filter(
        d=>d.cluster_label==="Premium (High Value/Bill)"
    ).length;

    const dominant = data.filter(
        d=>d.cluster_label==="Dominant Industries"
    ).length;

    const lowConfidence = data.filter(
        d=>d.low_confidence===true
    ).length;

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-5">
                Narrative Insights
            </h2>

            <div className="space-y-4">

                <div className="bg-blue-50 p-4 rounded-lg">

                    <b>Revenue Leader</b>

                    <p className="mt-1">

                        <b>{revenueLeader.industry}</b> contributes the
                        highest revenue among all industries.

                    </p>

                </div>

                <div className="bg-green-50 p-4 rounded-lg">

                    <b>Premium Segment</b>

                    <p className="mt-1">

                        {premium} industries are classified as
                        Premium (High Value/Bill).

                    </p>

                </div>

                <div className="bg-purple-50 p-4 rounded-lg">

                    <b>Dominant Industries</b>

                    <p className="mt-1">

                        {dominant} industries dominate
                        overall business performance.

                    </p>

                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">

                    <b>Low Confidence Industries</b>

                    <p className="mt-1">

                        {lowConfidence} industries have
                        insufficient history and should be
                        interpreted carefully.

                    </p>

                </div>

            </div>

        </div>

    );

}