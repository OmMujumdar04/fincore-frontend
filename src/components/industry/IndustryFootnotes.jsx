import useIndustryData from "../../hooks/useIndustryData";

export default function IndustryFootnotes() {

    const { data, loading } = useIndustryData();

    if (loading) return null;

    const lowConfidence = data.filter(
        d=>d.low_confidence===true
    ).length;

    return (

        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6">

            <h2 className="font-bold text-lg mb-4">
                Data Quality Footnotes
            </h2>

            <ul className="list-disc ml-6 space-y-2">

                <li>

                    Bubble size represents the number of unique
                    franchises in each industry.

                </li>

                <li>

                    Industries flagged as
                    <b> Low Confidence </b>
                    have limited historical observations.

                </li>

                <li>

                    Cluster assignments are generated using
                    K-Means clustering on revenue, bills,
                    average revenue per bill and franchise count.

                </li>

                <li>

                    {lowConfidence} industries currently
                    carry the Low Confidence flag.

                </li>

            </ul>

        </div>

    );

}