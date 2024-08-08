import React from "react";

import { useInView } from "react-intersection-observer";
import styles from "./styles.module.css";

const BgImage2 = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.5, // Trigger when 10% of the section is in view
  });
  return (
    <div className="relative">
      <div className={styles.bgImage2}>
        <div className=" no-pd">
          <div className="container">
            <div className={` ${styles.cardWrp}`} ref={ref}>
              <h3
                className={
                  inView ? styles.inViewAnimation : styles.leftOutViewAnimation
                }
              >
                EN IMMERSION TOTALE
              </h3>

              <p
                className={`pt-16 pb-32 mb-16 ${
                  inView ? styles.inViewAnimation : styles.rightOutViewAnimation
                }`}
              >
                Tout a été pensé pour vous faire vivre une expérience
                multi-sensorielle. Afin de vous plonger dans une ambiance
                chaleureuse et conviviale, la magie des chefs n’opère plus en
                cuisine mais devant vos yeux, et ce, en totale transparence.
              </p>
              <p
                className={`pt-16 pb-32 mb-16 ${
                  inView ? styles.inViewAnimation : styles.leftOutViewAnimation
                }`}
              >
                A mi-chemin entre la grande restauration et la cuisine de
                maison, vous serez charmés par un décor à la végétation
                luxuriante, typiquement asiatique et conquis par le raffinement
                de nos plats. Notre cuisine est le reflet d’une culture à part
                entière que nous nous efforçons de perpétuer au sein de nos
                restaurants.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.overlay} />
      </div>
    </div>
  );
};

export default BgImage2;
