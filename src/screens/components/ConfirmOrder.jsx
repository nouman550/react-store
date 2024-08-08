import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ConfirmOrder = ({ orderId }) => {
  const [states, setStates] = useState();
  useEffect(() => {
    document.querySelector("body").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/order/history/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setStates(data);
      })
      .catch((err) => {
        console.log(err);
      });
    const intervalId = setInterval(() => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/restaurants/order/history/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        )
        .then((res) => {
          let data = res.data;
          return data;
        })
        .then((data) => {
          setStates(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 50000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Fragment>
      <main className="bg_gray">
        <div className="container">
          <div className="row justify-content-center my-lg-12 my-8">
            <div className="col-lg-5">
              <div id="confirm-order" className="d-flex">
                <div className="icon icon--order-success svg add_bottom_15">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                  >
                    <g fill="none" stroke="#41b733" strokeWidth="2">
                      <circle cx="36" cy="36" r="35"></circle>
                      <path d="M17.417,37.778l9.93,9.909l25.444-25.393"></path>
                    </g>
                  </svg>
                </div>
                <h3 className="mt-3">Commande confirmée!</h3>
                <h3 className="green-heading">ID de commande : {orderId}</h3>
              </div>
              {states && (
                <div className="track-order">
                  <h4 className="text-center bebas-heading">
                    🛵 Etat de votre commande 🛵
                  </h4>
                </div>
              )}
              {states &&
                states.map((state, i) => (
                  <div className="" key={i}>
                    <div className="sb-categorie-card sb-mb-30 sb-categorie-card-white">
                      <div className="sb-card-body">
                        <div className="sb-card-descr">
                          <h5 className="sb-mb-10">{state.status}</h5>
                          <p className="sb-text sb-mb-15">
                            {state.date_created}
                          </p>
                          <p className="sb-text sb-mb-15">{state.remarks}</p>
                        </div>
                      </div>
                    </div>
                    {i < states.length - 1 && (
                      <div className="order-track-status">
                        <span className="order-track-status-dot"></span>
                        <span className="order-track-status-line"></span>
                      </div>
                    )}
                  </div>
                ))}
              {states &&
                states[states.length - 1].status !== "Servi" &&
                states[states.length - 1].status !== "Refusé" &&
                states[states.length - 1].status !== "Échoué" &&
                states[states.length - 1].status !== "Rejeté" &&
                states[states.length - 1].status !== "Livré" &&
                states[states.length - 1].status !== "* injoignable" &&
                states[states.length - 1].status !== "Annulé" &&
                states[states.length - 1].status !== "Commande prête" && (
                  <div>
                    <div className="order-track-status">
                      <span className="order-track-status-dot"></span>
                      <span className="order-track-status-line"></span>
                    </div>
                    <div
                      className="skelton track-order-loading"
                      style={{ position: "relative" }}
                    >
                      <Skeleton count={1} height={120}></Skeleton>
                      <p>
                        Nous mettrons à jour l'état de votre commande dans un
                        moment.
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ConfirmOrder;
