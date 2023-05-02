import React from "react";
import "./Team.css";
export default function Team() {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-right">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <div className="footer-left">
          <p className="footer-links">
            <a className="link-1" href="#">
              Home
            </a>
          </p>

          <p>
            Cleveland State University &copy; 2023
            <br></br>
            For more information on the data used on this webpage, please visit
            the <a href="https://www.who.int/"> WHO </a> and
            <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">
               CDC 
            </a>
            websites.
          </p>
        </div>
      </footer>
    </>
  );
}
