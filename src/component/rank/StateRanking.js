import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import "./StateRanking.css";
export default function StateRanking() {
  const { diseaseType, rankingPage, stackedDisplay } = useContext(AppContext);
  const [states, setStates] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://127.0.0.1:3001/getTopStates?diseaseType=" +
        diseaseType.toLowerCase()
    ).then((response) => {
      setStates([]);
      setCases([]);
      response.data.sort((a, b) => b.disease_cases - a.disease_cases);
      for (let j = 0; j < response.data.length; j++) {
        setStates((prevData) => [...prevData, response.data[j].state + " "]);
        setCases((prevData) => [
          ...prevData,
          response.data[j].disease_cases + " ",
        ]);
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
