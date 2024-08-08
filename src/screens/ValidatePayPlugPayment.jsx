import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import { useSearchParams } from "react-router-dom";
import ConfirmOrder from "./components/ConfirmOrder";
import { removeAllProducts } from "./../actions/cartAction";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const ValidatePayPlugPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(0);
  const [preloaderState, setPreloaderState] = useState(true);
  const [errorState, setErrorState] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/restaurants/6/validateOrder`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PAY_PLUG_TOKEN}`,
      },
      body: JSON.stringify({
        order_id: searchParams.get("order_id"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.is_paid === true) {
          setPreloaderState(false);
          setOrderId(searchParams.get("order_id"));
          dispatch(removeAllProducts());
        } else {
          setPreloaderState(false);
          setErrorState(true);
        }
      })
      .catch((err) => {
        setPreloaderState(false);
        setErrorState(true);
        console.log(err);
      });
  }, []);

  if (orderId === 0) {
    return (
      <Fragment>
        <div className="container" style={{ paddingTop: "135px" }}>
          {preloaderState === true && (
            <Fragment>
              <div className="validate-order-box">
                <div
                  role="alert"
                  className="mad-alert-box mad-alert-box--warning"
                >
                  <div className="mad-alert-box-inner">
                    <p className="text-center">
                      Paiement en cours de validation. Merci de ne pas fermer
                      cette fenêtre.
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center ">
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
            </Fragment>
          )}

          {errorState === true && (
            <div className="validate-order-box">
              <div role="alert" className="mad-alert-box mad-alert-box--error">
                <div className="mad-alert-box-inner">
                  <p className="text-center">
                    Une erreur est survenue. Merci de réessayer ou de choisir un
                    autre type de paiement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  } else {
    return <Navigate to={`/thank-you?order_id=${orderId}`} />;
  }
};

export default ValidatePayPlugPayment;
