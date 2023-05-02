import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import "./StateRanking.css";
const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example";

export default function StateRanking() {
  const { diseaseType, rankingPage, stackedDisplay } = useContext(AppContext);
  const [states, setStates] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const data = {
      query_data: {
        table: "highest_weekly_data",
        disease: diseaseType,
        week: "12",
        year: "2023",
        state: null,
      },
      function: {
        number: 5,
      },
    };

    Axios.post(url, data).then((response) => {
      // console.log(response.data);
      setStates([]);
      setCases([]);
      response.data.sort((a, b) => b[4] - a[4]);
      for (let j = 0; j < response.data.length; j++) {
        setStates((prevData) => [...prevData, response.data[j][3] + " "]);
        setCases((prevData) => [...prevData, response.data[j][4] + " "]);
      }
    });
  }, [diseaseType]);

  return (
    <motion.div layout>
      {rankingPage && (
        <table className="table" stack-display={stackedDisplay.toString()}>
          <caption className="text-center font-weight-bold" id="table-caption">
            {diseaseType[0].toUpperCase() + diseaseType.slice(1)}
          </caption>
          <caption className="text-center font-weight-bold" id="table-caption">
            {"Top 5 states of current week"}
          </caption>
          <thead>
            <tr>
              <th scope="col">Current Rank</th>
              <th scope="col">State</th>
              <th scope="col">Cases</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{state}</td>
                  <td>{cases[index]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </motion.div>
  );
}
