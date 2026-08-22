import Papa from "papaparse";

export async function loadFranchiseData() {

  const response = await fetch("/data/franchise_clustering_GROSS_latest.csv");

  const csv = await response.text();

  return new Promise((resolve) => {

    Papa.parse(csv, {

      header: true,

      dynamicTyping: true,

      skipEmptyLines: true,

      complete: (results) => {

        resolve(results.data);

      },

    });

  });

}