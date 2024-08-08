import React from "react";
import { Link } from "react-router-dom";

const MadSection = () => {
  return (
    <div>
      <div className="mad-section ">
        <div className="mad-entities type-2">
          <article className="mad-entity">
            <div className="mad-entity-media">
              <a href="#">
                <img
                  src="images/688x560_img1.jpg"
                  className="hover-image-animation"
                  alt=""
                  loading="lazy"
                />
              </a>
            </div>
            <div className="mad-entity-content">
              <h2 className="mad-entity-title">A propos de SUSHI STREET</h2>
              <p>
                Grace à SUSHI STREET, vous n'avez plus besoin de vous déplacer
                en Asie. Désormais, vous ne vous déplacez même pas de chez vous.
                Restez allongé sur votre canapé, ou faites ce que vous avez à
                faire. Nous allons faire tout le nécessaire pour vous laisser
                savourer et découvrir des sushis 100% Asiatiques et 100% Halal.
                <p style={{ marginTop: "10px" }}>
                  Toutes nos livraisons sont gratuites à Bobigny (93000), Noisy
                  le Sec (93130), Bondy (93140), Blanc Mesnil (93150), Livry
                  Gargan (93190), Bourget (93350), Pantin (93500), Pavillons
                  sous Bois (93320) et Drancy (93700).
                </p>
              </p>
              <Link to="./menu" className="btn btn-big btn-style-3">
                Voir la carte
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default MadSection;
