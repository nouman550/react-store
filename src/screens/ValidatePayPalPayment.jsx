import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import { useSearchParams } from "react-router-dom";
import ConfirmOrder from "./components/ConfirmOrder";
import { removeAllProducts } from "./../actions/cartAction";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const ValidatePayPalPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(0);
  const [preloaderState, setPreloaderState] = useState(true);
  const [errorState, setErrorState] = useState(false);

  let dispatch = useDispatch();

  useEffect(() => {
    const paypalId = searchParams.get("paypal_id");
    const orderId = searchParams.get("order_id");
    console.log(paypalId);
    fetch(`https://api-m.paypal.com/v2/checkout/orders/${paypalId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_PAYPAL_CLIENT_ID}:${process.env.REACT_APP_PAYPAL_SECREt_ID}`
        )}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(data.status)
        if (data.status === "COMPLETED") {
          console.log('success iam')

 // Send data to your server
                    fetch(`${process.env.REACT_APP_API_URL}/restaurants/6/orders/${orderId}/addPayPal`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                    },
                    body: JSON.stringify({ paypal_id: paypalId })
                    })
                    .then((response) => response.json())
                    .then((serverData) => {
                        console.log(serverData);
                      if (serverData.state === true) {
                        console.log('Order updated successfully on the server');
                      } else {
                        console.error('Failed to update order on the server');
                      }
                    })
                    .catch((serverError) => {
                      console.error("Error sending data to the server:", serverError);
                    });

          setPreloaderState(false);
          setOrderId(orderId);
          dispatch(removeAllProducts());
        } else {
          console.log('failed iam')
          setPreloaderState(false);
          setErrorState(true);
        }
      })
      .catch((err) => {
        setPreloaderState(false);
        setErrorState(true);
        console.error("Error verifying order status:", err);
      });
  }, [searchParams, dispatch]);

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

export default ValidatePayPalPayment;
