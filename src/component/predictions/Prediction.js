import React, { useState, useContext, useEffect } from "react";
import "./Prediction.css";
import { AppContext } from "../pages/DiseaseApp";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";

export default function Prediction() {
  const { diseaseType } = useContext(AppContext);
  const [date, setDate] = useState([]);
  const [cases, setCases] = useState([]);
  const [futureDates, setFutureDates] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);

  useEffect(() => {
    diseaseType &&
      Axios.get(
        "http://localhost:3001/getCurrentYear?diseaseType=" + diseaseType
      ).then((response) => {
        setDate([]);
        setCases([]);
        setFutureDates([]);
        for (let j = 0; j < response.data.length; j++) {
          setDate((prevData) => [...prevData, response.data[j].week + " "]);
          setCases((prevData) => [
            ...prevData,
            response.data[j].CasesInWeek + " ",
          ]);
          j > 0 && setFutureDates((prevData) => [...prevData, null + " "]);
        }
        setPredictions([
          response.data[response.data.length - 1].CasesInWeek,
          response.data[response.data.length - 5].CasesInWeek,
          response.data[response.data.length - 7].CasesInWeek,
          response.data[response.data.length - 3].CasesInWeek,
          response.data[response.data.length - 2].CasesInWeek,
        ]);
      });
  }, [diseaseType]);

  return (
    <div id="chart_center">
      <button
        id="prediction-button"
        onClick={() => setDisplayPredictions(!displayPredictions)}
      >
        {displayPredictions ? "Hide" : "Show"} Predictions
      </button>
      <div id="cases-chart">
        {!displayPredictions && (
          <Line
            data={{
              labels: [...date],
              datasets: [
                {
                  label:
                    diseaseType[0].toUpperCase() +
                    diseaseType.slice(1) +
                    " Cases",
                  data: [...cases],
                  // fill: true,
                  pointRadius: 0.7,
                  // lineTension: 0.5,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(154, 16, 235)",
                  order: 2,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Weeks",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Cases",
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 17,
                    },
                  },
                },
              },
            }}
          />
        )}
        {displayPredictions && (
          <Line
            data={{
              labels: [...date, 14, 15, 16, 17],
              datasets: [
                {
                  label:
                    diseaseType[0].toUpperCase() +
                    diseaseType.slice(1) +
                    " Cases",
                  data: [...cases],
                  // fill: true,
                  pointRadius: 0.7,
                  // lineTension: 0.5,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(154, 16, 235)",
                  order: 2,
                },
                {
                  label:
                    diseaseType[0].toUpperCase() +
                    diseaseType.slice(1) +
                    " Predictions",
                  data: displayPredictions
                    ? [...futureDates, ...predictions]
                    : [...futureDates],
                  // fill: true,
                  pointRadius: 0.5,
                  // lineTension: 0.7,
                  backgroundColor: "rgb(25, 235, 132)",
                  borderColor: "rgb(25, 235, 132)",
                  order: 2,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Weeks",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Cases",
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 17,
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
