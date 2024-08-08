import React from "react";

const PreLoader = ({ display }) => {
  return (
    <div className={display}>
      <div className="lds-ripple preloader">
        <img src="images/preloader.gif" alt="title" />
      </div>
    </div>
  );
};

export default PreLoader;
