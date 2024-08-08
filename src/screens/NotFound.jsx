import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <div className="not-found my-lg-12 my-12 ">
        <div className="container">
          <h2 className="text-center">
            Oups! CE N'EST PAS LA PAGE QUE VOUS CHERCHIEZ
          </h2>
          <h2 className="text-danger text-center">404</h2>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="images/not_found.svg"
              loading="lazy"
              alt="Page Not Found"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
