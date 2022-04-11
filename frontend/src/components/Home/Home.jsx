import React from "react";

import svgImg from "../../assets/home_img.svg";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="wrapper">
        <div className="col-1">
          <h1>Social Coding Experience</h1>
          <p>Where coders meet and interact with other coders</p>
        </div>
        <div className="col-2">
          <img src={svgImg} alt="img" />
        </div>
      </div>
    </div>
  );
}
