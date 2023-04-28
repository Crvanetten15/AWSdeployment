import React, { useContext, useEffect, useState } from "react";
import "./Nation.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";

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
    Axios.get(
      "http://127.0.0.1:3001/getCurrentWeekTotal?diseaseType=" + diseaseType
    ).then((response) => {
      for (let j = 0; j < response.data.length; j++) {
        response.data[j].disease === "covid" &&
          setCovidTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "campylobacteriosis" &&
          setCampylobacteriosisTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "chlamydia" &&
          setChlamydiaTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "gonorrhea" &&
          setGonorrheaTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "malaria" &&
          setMalariaTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "pneumococcal" &&
          setPneumoccalTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "syphilis" &&
          setSyphilisTotals(response.data[j].CasesInWeek);

        response.data[j].disease === "tuberculosis" &&
          setTuberculosisTotals(response.data[j].CasesInWeek);
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
