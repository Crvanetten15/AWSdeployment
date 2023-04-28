import React, { useEffect, useContext } from "react";
import * as d3 from "d3";
import "./Map.css";
import SvgUsMap from "./UsMap";
import { AppContext } from "../pages/DiseaseApp";
import { AnimatePresence, motion } from "framer-motion";

export default function Map() {
  const { choosenState, setChoosenState, choosenStateTitle, USMainMap, theme } =
    useContext(AppContext);

  useEffect(() => {
    if (choosenState && USMainMap) {
      d3.selectAll("path").style("fill", "#88a4bc");
      d3.selectAll("text").style("fill", "#d5ddec");
      d3.select(choosenState).style("fill", "red");

      function zoomed(event) {
        const { transform } = event;

        d3.select("g").attr("transform", transform);
        d3.select("g").attr("stroke-width", 1 / transform.k);
      }
    } else {
      setChoosenState(null);
      const svg = d3.select("svg").attr("viewBox", [0, 0, 487, 360]);
      svg.on(".zoom", null);
      d3.select("g").attr("transform", "translate(0,0) scale(1.0)");
    }
  }, [choosenState, USMainMap]);

  return (
    <AnimatePresence>
      {USMainMap ? (
        <motion.div layout theme-value={theme} key="USmap" id="map-svg">
          <SvgUsMap />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
