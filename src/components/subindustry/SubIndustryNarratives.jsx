import useSubIndustryData from "../../hooks/useSubIndustryData";

export default function SubIndustryNarratives() {

  const { data, loading } = useSubIndustryData();

  if (loading) return null;

  const totalRevenue = data.reduce(
    (s, r) => s + Number(r.total_revenue),
    0
  );

  const pct = (cluster) => {

    const rev = data
      .filter(r=>r.cluster_label===cluster)
      .reduce((s,r)=>s+Number(r.total_revenue),0);

    return ((rev/totalRevenue)*100).toFixed(1);

  };

  const cards = [

    {
      title:"Dominant Sub Industries",

      text:`Top sub-industries contribute ${pct("Dominant Sub-Industries")}% of company revenue.`
    },

    {
      title:"Established / Core",

      text:`Largest revenue segment contributing ${pct("Established / Core")}% of revenue.`
    },

    {
      title:"Premium",

      text:`Premium sub-industries command higher revenue per bill and should be monitored for expansion.`
    },

    {
      title:"Emerging / Niche",

      text:`Long-tail segment contributing ${pct("Emerging / Niche")}% of revenue.`
    },

    {
      title:"New / Insufficient",

      text:`Too few bills for reliable categorisation.`
    }

  ];

  return(

    <div>

      <h2 className="text-2xl font-bold mb-5">

        Narrative Insights

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {cards.map(card=>(

          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-5"
          >

            <h3 className="font-bold">

              {card.title}

            </h3>

            <p className="mt-2 text-gray-600">

              {card.text}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}