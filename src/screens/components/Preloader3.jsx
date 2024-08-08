import React from "react";

const Preloader3 = ({ display }) => {
  return (
    <div className={display === true ? "d-block" : "d-none"}>
      <div className="lds-ripple-2 lds-ripple-3">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader3;
