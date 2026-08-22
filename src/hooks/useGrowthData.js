import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function useGrowthData() {

  const [attritionData, setAttritionData] = useState([]);
  const [readinessData, setReadinessData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadData() {

      try {

        const attrition = await fetch("/data/franchise_tier_attrition_rates.csv")
          .then((r) => r.text());

        const readiness = await fetch("/data/franchise_readiness_GROSS_latest_NETREV.csv")
          .then((r) => r.text());

        const Papa = (await import("papaparse")).default;

        setAttritionData(
          Papa.parse(attrition, {
            header: true,
            dynamicTyping: true,
          }).data
        );

        setReadinessData(
          Papa.parse(readiness, {
            header: true,
            dynamicTyping: true,
          }).data
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    }

    loadData();

  }, []);

  return {

    attritionData,
    readinessData,
    loading,

  };

}