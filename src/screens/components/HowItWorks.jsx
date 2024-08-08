import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <div>
      <div
        className="
              mad-section mad-section--stretched
              mad-colorizer--scheme-color-5
            "
      >
        <div className="mad-title-wrap align-center">
          <h2 className="mad-page-title">Livraison en 3 étapes</h2>
          <p>
            Notre nouveau site web est concu pour rendre <br /> la navigation de
            nos chers clients plus agréable qu'avant.
          </p>
        </div>

        <div className="mad-icon-boxes with-arrows style-3 align-center item-col-3">
          <div className="mad-col">
            <article className="mad-icon-box">
              <i className="mad-icon-box-icon">
                <img
                  className="svg"
                  src="yummi_svg_icons/cart.svg"
                  alt=""
                  loading="lazy"
                />
              </i>
              <div className="mad-icon-box-content">
                <h5 className="mad-icon-box-title">
                  1. Remplissez votre panier
                </h5>
                <p>
                  Avec Sushi Street, c'est un large choix de produits <br />{" "}
                  (Japonais, Chinois, des menus à composer…)
                </p>
              </div>
            </article>
          </div>
          <div className="mad-col">
            <article className="mad-icon-box">
              <i className="mad-icon-box-icon">
                <img
                  className="svg"
                  src="yummi_svg_icons/wallet.svg"
                  loading="lazy"
                  alt=""
                />
              </i>
              <div className="mad-icon-box-content">
                <h5 className="mad-icon-box-title">2. Payez</h5>
                <p>
                  Vous pouvez payer en espèce, par chèque, <br /> par carte
                  bleu, paypal ou même en ticket restaurant
                </p>
              </div>
            </article>
          </div>
          <div className="mad-col">
            <article className="mad-icon-box">
              <i className="mad-icon-box-icon">
                <img
                  className="svg"
                  src="yummi_svg_icons/delivery2.svg"
                  alt=""
                  loading="lazy"
                />
              </i>
              <div className="mad-icon-box-content">
                <h5 className="mad-icon-box-title">
                  3. Livraison ou à emporter
                </h5>
                <p>
                  C'est à vous de choisir si vous voulez récupérer <br />{" "}
                  vous-même votre commande ou qu'elle soit livrée à votre porte.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="align-center">
          <Link to="./menu" className="btn btn-style-3 btn-big">
            JE COMMANDE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
