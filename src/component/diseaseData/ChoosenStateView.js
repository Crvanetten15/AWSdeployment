import React, { useContext, useState, useEffect } from "react";
import "./ChoosenStateView.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import Axios from "axios";

const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example";

export default function ChoosenStateView() {
  const {
    choosenState,
    setChoosenState,
    diseaseType,
    compareStates,
    changeMapColor,
  } = useContext(AppContext);
  const [date, setDate] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [cases, setCases] = useState([]);
  const [scroll, setScroll] = useState("true");
  const [year, setYear] = useState("2023");
  const [riskLevel, setRiskLevel] = useState(null);
  const [riskNum, setRiskNum] = useState([]);
  const [populationArr, setpopulationArr] = useState([]);
  const [riskColor, setRiskColor] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [futureDates, setFutureDates] = useState([]);
  const [displayPredictions, setDisplayPredictions] = useState(false);

  const states = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Guam", "GU"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  let population_division = 1;
  const population = {
    query_data: {
      table: "population_data",
      disease: null,
      week: null,
      year: null,
      state: null,
    },
    function: {
      number: 1,
    },
  };
  Axios.post(url, population).then((response) => {
    for (let x = 0; x < response.data.length; x++) {}
  });

  useEffect(() => {
    let serverStateName;

    compareStates ? setChoosenState(null) : setChoosenState(choosenState);

    // if (response.data[x][0] === serverStateName) {
    //   let pup  = response.data[x][1]
    //   population_division = pup
    //   console.log(pup + " POPULATION")
    //   break;
    // }
    // riskNum === 20
    //   ? setRiskColor("red")
    //   : riskNum === 10
    //   ? setRiskColor("orange")
    //   : setRiskColor("yellow");

    // riskNum === 20
    //   ? setRiskLevel("High")
    //   : riskNum === 10
    //   ? setRiskLevel("Medium")
    //   : setRiskLevel("Low");

    let populations;
    const population = {
      query_data: {
        table: "population_data",
        disease: null,
        week: null,
        year: null,
        state: null,
      },
      function: {
        number: 1,
      },
    };
    Axios.post(url, population).then((response) => {
      populations = response.data;
      setpopulationArr(populations);
    });
    if (choosenState) {
      serverStateName = states.find((state) => state[1] === choosenState.id)[0];

      const data = {
        query_data: {
          table: "weekly_data",
          disease: diseaseType,
          week: null,
          year: year,
          state: serverStateName,
        },
        function: {
          number: 4,
        },
      };
      diseaseType &&
        serverStateName &&
        year &&
        Axios.post(url, data).then((response) => {
          setDate([]);
          setDeaths([]);
          setCases([]);
          setFutureDates([]);
          let index = 0;
          for (let j = 0; j < populationArr.length; j++) {
            if (populationArr[j][0] === serverStateName) {
              console.log(populationArr[j]);
              console.log(serverStateName);
              index = j;
            }
          }
          console.log(response.data[response.data.length - 1][3] + "TOTAL");
          let x =
            (response.data[response.data.length - 1][3] /
              populationArr[index][1]) *
            100000;
          console.log(x + " RETURN ");
          setRiskNum([x]);

          for (let j = 0; j < response.data.length; j++) {
            setDate((prevData) => [...prevData, response.data[j][2] + " "]);
            j > 0 && setFutureDates((prevData) => [...prevData, null + " "]);

            diseaseType === "covid"
              ? setDeaths((prevData) => [
                  ...prevData,
                  response.data[j][4] + " ",
                ])
              : setDeaths([]);
            setCases((prevData) => [...prevData, response.data[j][3] + " "]);
            // console.log(cases)
          }
        });
    } else {
      setYear("2023");
      setCases([]);
      setDate([]);
    }
  }, [choosenState, compareStates, diseaseType, year, changeMapColor]);

  useEffect(() => {
    if (riskNum >= 20) {
      setRiskColor("red");
      setRiskLevel("High");
    } else if (riskNum >= 10 && !(riskNum >= 20)) {
      setRiskColor("orange");
      setRiskLevel("Medium");
    } else {
      setRiskColor("yellow");
      setRiskLevel("Low");
    }
    // console.log('Data has changed:', riskNum);
  }, [riskNum]);

  return (
    <>
      <AnimatePresence>
        {choosenState && (
          <motion.div
            className="data-section"
            layout
            active-state={JSON.stringify(compareStates)}
          >
            <div id="year-selector">
              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="year"
                  name="year"
                  onChange={(e) => setYear(e.target.selectedOptions[0].text)}
                >
                  {/* <option value="">Choose Year</option> */}
                  <option value="2023">2023</option>{" "}
                  <option value="2022">2022</option>{" "}
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
            </div>
            {console.log(year)}
            <div id="left-display-state-data" scroll-value={scroll}>
              {year !== "2023" && (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: [...date],
                    datasets: [
                      {
                        id: 1,
                        label:
                          diseaseType[0].toUpperCase() +
                          diseaseType.slice(1) +
                          " Cases",
                        data: [...cases],
                        fill: true,
                        pointRadius: 0.5,
                        lineTension: 0.5,
                        backgroundColor: "rgb(173, 216, 230)",
                        borderColor: "rgb(54, 16, 235)",
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Week",
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
              {console.log(...futureDates)}
              {year === "2023" && (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: [...date, 14, 15],
                    datasets: [
                      {
                        id: 1,
                        label:
                          diseaseType[0].toUpperCase() +
                          diseaseType.slice(1) +
                          " Cases",
                        data: [...cases],
                        fill: true,
                        pointRadius: 0.5,
                        lineTension: 0.5,
                        backgroundColor: "rgb(173, 216, 230)",
                        borderColor: "rgb(54, 16, 235)",
                      },
                      {
                        label:
                          diseaseType[0].toUpperCase() +
                          diseaseType.slice(1) +
                          " Predictions",
                        data: [
                          ...futureDates,
                          cases[cases.length - 1],
                          cases[cases.length - 5],
                          cases[cases.length - 3],
                        ],

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
                          text: "Week",
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
              {diseaseType === "covid" && (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: [...date],
                    datasets: [
                      {
                        id: 1,
                        label:
                          diseaseType[0].toUpperCase() +
                          diseaseType.slice(1) +
                          " Deaths",
                        data: [...deaths],
                        fill: true,
                        pointRadius: 0.5,
                        lineTension: 0.5,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Week",
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

              <div id="bar-chart">
                <Bar
                  datasetIdKey="id"
                  data={{
                    labels: [null, 0, 1, 0, null],
                    datasets: [
                      {
                        id: 1,
                        label: "# of Infected per 100,000",
                        data: [null, null, riskNum],
                        fill: true,
                        pointRadius: 0.5,
                        lineTension: 0.5,
                        backgroundColor: [riskColor],
                      },
                    ],
                  }}
                  options={{
                    type: "bar",
                    scales: {
                      x: {
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        ticks: {
                          // add this object
                          min: 0,
                          max: 20,
                          display: true,
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
                <h2>Risk Assessment Level : {riskLevel}</h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
