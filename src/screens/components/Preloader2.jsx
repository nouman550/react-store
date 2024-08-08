import React from "react";

const Preloader2 = ({ display }) => {
  return (
    <div className={display}>
      <div className="lds-ripple-2 ">
        <img
          src="images/preloadermenu.gif"
          style={{ filter: "invert(1)" }}
          alt="title"
        />
      </div>
    </div>
  );
};

export default Preloader2;
