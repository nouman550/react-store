import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

const HomeSections = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.1, // Trigger when 10% of the section is in view
  });

  return (
    <div className={`mad-section  `} ref={ref}>
      <div className="mad-entities type-2">
        <div
          className={`${styles.py144}  ${
            inView ? "inViewAnimation" : "outViewAnimation"
          }`}
        >
          Découvrez l'essence authentique du Japon & Thaï dans chaque bouchée
          chez Sushi Street. Que ce soit à emporter ou en livraison, Sushi
          Street comble toutes vos envies asiatiques.
        </div>
        <div className="row mb-32 pb-32">
          <div className="col-lg-6">
            <img
              decoding="async"
              className={`${styles.imgObjectFit} ${styles.spinner}`}
              src="/bankok/circle-img.webp"
              alt=""
            />
          </div>
          <div
            className={`col-lg-6 ${
              inView ? styles.inViewAnimation : styles.rightOutViewAnimation
            } `}
          >
            <h3>Faites le tour de la cuisine Japonaise & Thaï</h3>
            <p>
              Grace à SUSHI STREET, vous n'avez plus besoin de vous déplacer en
              Asie. Désormais, vous ne vous déplacez même pas de chez vous.
              Restez allongé sur votre canapé, ou faites ce que vous avez à
              faire. Nous allons faire tout le nécessaire pour vous laisser
              savourer et découvrir des sushis 100% Asiatiques et 100% Halal.
            </p>

            <p className="pt-16 pb-32 mb-16">
              Toutes nos livraisons sont gratuites à Bobigny (93000), Noisy le
              Sec (93130), Bondy (93140), Blanc Mesnil (93150), Livry Gargan
              (93190), Bourget (93350), Pantin (93500), Pavillons sous Bois
              (93320) et Drancy (93700).
            </p>

            <Link className={styles.menuBtn} to={"/menu"}>
              VOIR LE MENU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSections;
