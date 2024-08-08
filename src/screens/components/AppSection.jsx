import React, { Fragment } from "react";

const AppSection = () => {
  return (
    <Fragment>
      <div className="mad-section mad-section--stretched container">
        <div className="row align-items-center ">
          <div className="col-lg-6">
            <h2>
              Et oui, c'est plus avantageux avec notre application <br />
            </h2>
            <p className="content-element-6">
              Plus d'offres, plus de promo réservés aux utilisateurs de notre
              application. Soyez notifiez sur toutes les actualités et gagnez
              des points de fidélité sur chaque commande.
            </p>
            <div className="btn-set big-btns">
              <a
                href="https://apps.apple.com/us/app/sushi-street-france/id1609611362"
                target="_blank"
                rel="noreferrer"
              >
                <img src="images/app_store.png" alt="" loading="lazy" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=fr.power.sushistreet"
                target="_blank"
                rel="noreferrer"
              >
                <img src="images/google_pay.png" alt="" loading="lazy" />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mad-img">
              <img
                src="images/app.png"
                alt=""
                style={{ animation: "pulse 2s ease infinite" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="mad-instafeed instgram-pictures style-2">
          <div className="mad-grid item-col-5 no-gutters">
            <div className="mad-col">
              <a
                href="https://www.instagram.com/sushi_street/"
                className="instgram-pictures-img"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="images/1.jpg"
                  alt="sushi street instgram 1"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="mad-col">
              <a
                href="https://www.instagram.com/sushi_street/"
                className="instgram-pictures-img"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="images/2.jpg"
                  alt="sushi street instgram 2"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="mad-col">
              <a
                href="https://www.instagram.com/sushi_street/"
                className="instgram-pictures-img"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="images/5.jpeg"
                  alt="sushi street instgram 3"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="mad-col">
              <a
                href="https://www.instagram.com/sushi_street/"
                className="instgram-pictures-img"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="images/4.jpg"
                  alt="sushi street instgram 4"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="mad-col">
              <a
                href="https://www.instagram.com/sushi_street/"
                className="instgram-pictures-img"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="images/3.jpg"
                  alt="sushi street instgram 5"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppSection;
