import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { useInView } from "react-intersection-observer";

const AnimationSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.2, // Trigger when 10% of the section is in view
  });
  return (
    <div className={`mad-section ${styles.py144} `}>
      <div className="mad-entities type-2">
        <div className="row mb-32 pb-32 mt-30" ref={ref}>
          <div className="col-lg-6 min-h-250 mt-30">
            <div className={styles.verticalText}>LIVRAISON</div>
            <div>
              <img
                src="/bankok/sec-img3.jpg"
                alt="img"
                className={styles.firstImage}
              />
              <img
                src="/bankok/sec-img2.webp"
                alt="img"
                className={styles.secondImage}
              />
              <img src="/bankok/bag.PNG" alt="img" className={styles.bagImg} />
            </div>
          </div>
          <div
            className={`col-lg-6 ${
              inView ? styles.inViewAnimation : styles.rightOutViewAnimation
            }`}
          >
            <h3>COMMANDEZ DÈS MAINTENANT</h3>
            <p>
              Profitez pleinement de notre service de livraison gratuite et
              bénéficiez des mêmes prix avantageux qu'au restaurant en passant
              commande sur notre site web. Nous mettons un point d'honneur à
              traiter votre commande avec la plus grande attention et rapidité.
            </p>

            <p className="pt-16 pb-32 mb-16">
              Découvrez la simplicité et le confort de la commande en ligne, et
              laissez-nous vous offrir une expérience culinaire exceptionnelle,
              directement chez vous.
            </p>

            <Link className={styles.menuBtn} to={"/menu"}>
              Commander
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
