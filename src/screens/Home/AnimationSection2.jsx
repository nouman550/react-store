import React from "react";

import { useInView } from "react-intersection-observer";
import styles from "./styles.module.css";

const AnimationSection2 = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.2, // Trigger when 10% of the section is in view
  });
  return (
    <div className={`mad-section ${styles.py144} `}>
      <div className="mad-entities type-2">
        <div className="row mb-32 pb-32" ref={ref}>
          <div
            className={`col-lg-6 ${
              inView ? styles.inViewAnimation : styles.leftOutViewAnimation
            }`}
          >
            <h3>Localisez notre restaurant</h3>

            <p className="pt-16 pb-32 mb-16">
              Sushi Street vous offre un cadre exceptionnel pour vos commandes
              sur place à Drancy. Que vous veniez pour un repas rapide ou pour
              une soirée entre famille, notre restaurant est conçu pour vous
              accueillir dans une ambiance chaleureuse et confortable. Profitez
              d'un espace réinventé, alliant élégance et modernité, pour
              savourer nos délicieux plats japonais et thaïlandais.
            </p>

            <span
              onClick={() =>
                window.open("https://g.page/drancystreetsushi?share")
              }
              className={styles.menuBtn}
              // to={"https://g.page/drancystreetsushi?share"}
            >
              NOTRE LOCALISATION
            </span>
          </div>
          <div className="col-lg-6 min-h-250">
            <div className={styles.verticalText2}>NOS ADRESSES</div>
            <div className="pl-32">
              <img
                src="/bankok/sec2-img2.webp"
                className={styles.image2}
                alt="img"
              />
              <img
                src="/bankok/sec2-img1.webp"
                alt="img"
                className={styles.image1}
              />
              <img
                src="/bankok/sec2-img3.jpeg"
                alt="img"
                className={styles.image3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSection2;
