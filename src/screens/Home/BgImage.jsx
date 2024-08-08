import React from "react";

import styles from "./styles.module.css";
import { useInView } from "react-intersection-observer";

const HomeBgImage = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.5, // Trigger when 10% of the section is in view
  });

  return (
    <div className="relative">
      <div
        className={styles.bgImage}
        data-background-image="https://bangkokfactory.fr/wp-content/uploads/2022/04/IMG_3866_copyrights_Alexandre_Alloul-scaled-e1651161743819.jpg"
        data-mobile-background-image="https://bangkokfactory.fr/wp-content/uploads/2022/04/IMG_3866_copyrights_Alexandre_Alloul-scaled-e1651161743819-uai-900x632.jpg"
      >
        <div className={styles.overlay} />
        <div className=" no-pd">
          <div className="container" ref={ref}>
            <div className={`row ${styles.cardWrp}`}>
              <div
                className={`col-lg-4 ${
                  inView ? styles.inViewAnimation : styles.leftOutViewAnimation
                }`}
              >
                <img src="/bankok/icon1.webp" width="70" height="70" alt="" />
                <div className={styles.cardTitle}>
                  1. Remplissez votre panier
                </div>
                <p className={styles.cardDescription}>
                  Avec Sushi Street, c'est un large choix de produits (Japonais,
                  Chinois, des menus à composer…)
                </p>
              </div>
              <div className={`col-lg-4`}>
                <img src="/bankok/icon2.webp" width="70" height="70" alt="" />
                <div className={styles.cardTitle}>2. Payez</div>
                <p className={styles.cardDescription}>
                  Vous pouvez payer en espèce, par chèque, par carte bleu,
                  paypal ou même en ticket restaurant
                </p>
              </div>
              <div
                className={`col-lg-4  ${
                  inView ? styles.inViewAnimation : styles.rightOutViewAnimation
                }`}
              >
                <img src="/bankok/icon3.webp" alt="" width="70" height="70" />
                <div className={styles.cardTitle}>
                  3. Livraison ou à emporter
                </div>
                <p className={styles.cardDescription}>
                  C'est à vous de choisir si vous voulez récupérer vous-même
                  votre commande ou qu'elle soit livrée à votre porte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBgImage;
