import React, { useContext, useState, useEffect } from "react";
import "./ComparisonRight.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import Axios from "axios";

const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example";

export default function ComparisonRight() {
  const { diseaseType, compareStates, theme } = useContext(AppContext);
  const [dropDownState, setDropDownState] = useState(null);
  const [year, setYear] = useState(null);
  const [date, setDate] = useState([]);
  const [cases, setCases] = useState([]);
  const [incrementingCases, setIncrementingCases] = useState([]);

  function chooseStateData(e) {
    let stateName = e.target.selectedOptions[0].text;
    setDropDownState(stateName);
  }

  useEffect(() => {
    let serverStateName;

    if (compareStates) {
      serverStateName = dropDownState;

      setDate([]);
      setCases([]);

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
          // setDeaths([]);
          setCases([]);
          // console.log(response.data);
          for (let j = 0; j < response.data.length; j++) {
            // if (response.data[j].state === serverStateName) {
            setDate((prevData) => [...prevData, response.data[j][2] + " "]);
            // diseaseType === "covid"
            //   ? setDeaths((prevData) => [
            //       ...prevData,
            //       response.data[j][4] + " ",
            //     ])
            //   : setDeaths([]);
            setCases((prevData) => [...prevData, response.data[j][3] + " "]);
            // }
          }
        });

      diseaseType &&
        serverStateName &&
        year &&
        Axios.post(url, data).then((response) => {
          setIncrementingCases([]);
          setDate([]);
          for (let j = 0; j < response.data.length; j++) {
            // if (response.data[j].state === serverStateName) {
            setDate((prevData) => [...prevData, response.data[j][2] + " "]);
            // diseaseType === "Covid"
            //   ? setDeaths((prevData) => [
            //       ...prevData,
            //       response.data[j].disease_deaths + " ",
            //     ])
            //   : setDeaths([]);
            setIncrementingCases((prevData) => [
              ...prevData,
              prevData.length === 0
                ? 0
                : prevData[prevData.length - 1] + response.data[j][3],
            ]);
            // }
          }
        });
    } else setDropDownState(null);
  }, [diseaseType, dropDownState, compareStates, year]);

  return (
    <>
      <AnimatePresence>
        {compareStates && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            initial={{ x: "70%" }}
            animate={{ x: "0%", transition: { duration: 2 } }}
            active-state={JSON.stringify(compareStates)}
          >
            <div id="right-comparison-dropdowns">
              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="state"
                  name="state"
                  onChange={chooseStateData}
                >
                  <option value="">Choose State</option>
                  <option value="AK">Alaska</option>
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DC">District of Columbia</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="IA">Iowa</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MD">Maryland</option>
                  <option value="ME">Maine</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MO">Missouri</option>
                  <option value="MS">Mississippi</option>
                  <option value="MT">Montana</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="NE">Nebraska</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NV">Nevada</option>
                  <option value="NY">New York</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VA">Virginia</option>
                  <option value="VT">Vermont</option>
                  <option value="WA">Washington</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WV">West Virginia</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>

              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="year"
                  name="year"
                  onChange={(e) => setYear(e.target.selectedOptions[0].text)}
                >
                  <option value="">Choose Year</option>
                  <option value="">2020</option>
                  <option value="AK">2021</option>
                  <option value="AL">2022</option>
                  <option value="AR">2023</option>
                </select>
              </div>
            </div>

            <div id="right-display-state-data">
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
                        " total per year ",
                      data: [...cases],
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
                        " total per year (Cumulative)",
                      data: [...incrementingCases],
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
