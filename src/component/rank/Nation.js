import React, { useContext, useEffect, useState } from "react";
import "./Nation.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";
const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example";

export default function Nation() {
  const { rankingPage, diseaseType, stackedDisplay } = useContext(AppContext);
  const [covidTotals, setCovidTotals] = useState(0);
  const [campylobacteriosisTotals, setCampylobacteriosisTotals] = useState(0);
  const [chlamydiaTotals, setChlamydiaTotals] = useState(0);
  const [gonorrheaTotals, setGonorrheaTotals] = useState(0);
  const [malariaTotals, setMalariaTotals] = useState(0);
  const [pneumoccalTotals, setPneumoccalTotals] = useState(0);
  const [syphilisTotals, setSyphilisTotals] = useState(0);
  const [tuberculosisTotals, setTuberculosisTotals] = useState(0);

  useEffect(() => {
    const data = {
      query_data: {
        table: "disease_weekly_totals",
        disease: null,
        week: "12",
        year: "2023",
        state: null,
      },
      function: {
        number: 2,
      },
    };

    Axios.post(url, data).then((response) => {
      // console.log(response.data);
      for (let j = 0; j < response.data.length; j++) {
        response.data[j][0] === "covid" && setCovidTotals(response.data[j][3]);

        response.data[j][0] === "campylobacteriosis" &&
          setCampylobacteriosisTotals(response.data[j][3]);

        response.data[j][0] === "chlamydia" &&
          setChlamydiaTotals(response.data[j][3]);

        response.data[j][0] === "gonorrhea" &&
          setGonorrheaTotals(response.data[j][3]);

        response.data[j][0] === "malaria" &&
          setMalariaTotals(response.data[j][3]);

        response.data[j][0] === "pneumococcal" &&
          setPneumoccalTotals(response.data[j][3]);

        response.data[j][0] === "syphilis" &&
          setSyphilisTotals(response.data[j][3]);

        response.data[j][0] === "tuberculosis" &&
          setTuberculosisTotals(response.data[j][3]);
      }
    });
  }, []);

  return (
    rankingPage && (
      <motion.div layout>
        <Doughnut
          id="doughnut-chart"
          stack-display={stackedDisplay.toString()}
          data={{
            labels: [
              "Covid",
              "Gonorrhea",
              "Malaria",
              "Campylobacteriosis",
              "Chlamydia",
              "Pneumococcal",
              "Syphilis",
              "Tuberculosis",
            ],
            datasets: [
              {
                label: "Cases",
                data: [
                  covidTotals,
                  gonorrheaTotals,
                  malariaTotals,
                  campylobacteriosisTotals,
                  chlamydiaTotals,
                  pneumoccalTotals,
                  syphilisTotals,
                  tuberculosisTotals,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
            // maintainAspectRatio: true,
            // responsive: true,
          }}
        />
      </motion.div>
    )
  );
}
