import React, { useState, useContext, useEffect } from "react";
import "./YearToDateWithPrediction.css";
import { AppContext } from "../pages/DiseaseApp";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";
const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example";

export default function YearToDateWithPrediction() {
  const { diseaseType } = useContext(AppContext);
  const [date, setDate] = useState([]);
  const [cases, setCases] = useState([]);
  const [futureDates, setFutureDates] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);

  useEffect(() => {
    setPredictions([]);
    const predictionData = {
      query_data: {
        table: "prediction_weekly_totals",
        disease: diseaseType,
        week: null,
        year: "2023",
        state: null,
      },
      function: {
        number: 3,
      },
    };

    Axios.post(url, predictionData).then((response) => {
      console.log(response.data);

      for (let j = 0; j < response.data.length; j++) {
        setPredictions((prevData) => [...prevData, response.data[j][3]]);
      }
    });

    const data = {
      query_data: {
        table: "disease_weekly_totals",
        disease: diseaseType,
        week: null,
        year: "2023",
        state: null,
      },
      function: {
        number: 3,
      },
    };

    diseaseType &&
      Axios.post(url, data).then((response) => {
        setDate([]);
        setCases([]);
        setFutureDates([]);
        for (let j = 0; j < response.data.length; j++) {
          setDate((prevData) => [...prevData, response.data[j][2] + " "]);
          setCases((prevData) => [...prevData, response.data[j][3] + " "]);
          j > 0 && setFutureDates((prevData) => [...prevData, null + " "]);
        }
        // setPredictions([
        //   response.data[response.data.length - 1][3],
        //   response.data[response.data.length - 5][3],
        //   response.data[response.data.length - 7][3],
        //   response.data[response.data.length - 3][3],
        //   response.data[response.data.length - 2][3],
        // ]);
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
                  fill: true,
                  pointRadius: 0.7,
                  lineTension: 0.5,
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
                  fill: true,
                  pointRadius: 0.7,
                  lineTension: 0.5,
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
                    ? [...futureDates, cases[cases.length - 1], ...predictions]
                    : [...futureDates],
                  fill: true,
                  pointRadius: 0.5,
                  lineTension: 0.7,
                  backgroundColor: "rgb(25, 235, 132)",
                  borderColor: "rgb(54, 16, 235)",
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
