import React, { useEffect, useState } from "react";
import "./ColorLegend.css";
export default function ColorLegend() {
  return (
    <>
      <div id="color-legend-container">
        ColorLegend
        <p>Cases - Total</p>
        <p> {">"}5,000,000 </p>
        <p> 500,001 – 5,000,000 </p>
        <p>50,001 – 500,000 </p>
        <p> 1 – 5,000</p>
      </div>
    </>
  );
}
