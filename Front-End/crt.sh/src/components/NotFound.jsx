import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container-notfound ">
      <p className="p not-found"> Result not found </p>
      <div className="tipsiz">
        <div className="tipsiz-body">
          <div className="left-arm arm"></div>
          <div className="face">
            <div className="upper-face">
              <div className="element">4</div>
              <div className="element">0</div>
              <div className="element">4</div>
            </div>
            <div className="mouth"></div>
          </div>
          <div className="right-arm arm"></div>
        </div>
      </div>

      <p className="p">
        maybe you want to go
        <Link className="a" to={"/"}>
          back?
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
