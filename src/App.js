import React from "react";
import DiseaseApp from "./component/pages/DiseaseApp";
import axios from 'axios';
const url = "https://gfn1a5n8m7.execute-api.us-east-2.amazonaws.com/example"


const data = {
  query_data: {
    table:"weekly_data",
    disease:null,
    week:null,
    year:null,
    state:null
  },
  function: {
    number:1
  }
};


export default function App() {
  axios.post(url, data)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

  return (
    <>
      <DiseaseApp />
    </>
  );
}
