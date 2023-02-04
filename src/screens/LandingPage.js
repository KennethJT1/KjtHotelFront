import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto text-center"
        style={{ borderRight: "8px solid white !important" }}
      >
        <h2 style={{ color: "white", fontSize: "130px" }}>KjtHOTEL</h2>
        <h1 style={{ color: "white" }}>You are welcome to this great Hotel</h1>

        <Link to="/home">
          <button className="btn landingbtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};
