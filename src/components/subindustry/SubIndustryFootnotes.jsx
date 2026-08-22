export default function SubIndustryFootnotes(){

    const notes=[

        "Casing de-duplication verified across common sub-industry names.",

        "Near-duplicate naming variants (e.g. Residential & Commercial Projects) should still be reviewed manually.",

        "No exact casing duplicates remain after preprocessing.",

        "Low-confidence categories indicate fewer than 3 unique franchises and should be interpreted cautiously."

    ];

    return(

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Data Quality Footnotes

            </h2>

            <ul className="space-y-3 list-disc ml-6">

                {notes.map((n,i)=>(

                    <li key={i}>{n}</li>

                ))}

            </ul>

        </div>

    );

}