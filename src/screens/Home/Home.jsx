import React, { Fragment, useEffect } from "react";
import AppSection from "../components/AppSection";
import BlogSection from "../components/BlogSection";
import DiscoverMenu from "../components/DiscoverMenu";
import FooterBanners from "../components/FooterBanners";
import HomeHero from "../components/HomeHero";
import HowItWorks from "../components/HowItWorks";
import MadSection from "../components/MadSection";
import { Helmet } from "react-helmet";
import HomeSections from "./Sections";
import HomeBgImage from "./BgImage";
import AnimationSection from "./AnimationSection";
import AnimationSection2 from "./AnimationSection2";
import BgImage2 from "./BgImage2";

import styles from "./styles.module.css";

const Home = ({ showText }) => {
  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sushi Street</title>
        <meta
          name="description"
          content="Sushi Street est le seul restaurant qui vous fera sentir le gout Asiatique (chinois, japonais, ...) sans vous déplacer d'un seul pas en avant."
        />
        <meta
          name="keywords"
          content="sushi, asiatique, livraison, commande en ligne, bobigny, bourget, pantin"
        />
      </Helmet>
      <div
        id="mad-page-wrapper"
        // style={{ marginTop: "-164px" }}
        className="mad-page-wrapper"
      >
        <div className={styles.videoContainer}>
          <video
            className={styles.video}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
          >
            <source
              // src="https://bangkokfactory.fr/wp-content/uploads/2024/04/Bangkok-Factory-Produit-V.1.4-25-1.mp4?_=2"
              src="/homepage-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div
            className={`${styles.content} ${
              showText ? styles.showText : styles.hideText
            }`}
          >
            <h1>JAPONAIS & THAÏ</h1>
            {/* <h1>CUISINE THAÏ</h1> */}
          </div>
        </div>
        {/* <video
          width="100%"
          height="auto"
          loop={true}
          autoPlay={true}
          muted={true}
        >
          <source
            src="https://bangkokfactory.fr/wp-content/uploads/2024/04/Bangkok-Factory-Produit-V.1.4-25-1.mp4?_=2"
            type="video/mp4"
          />
        </video> */}
        <div className="block-bg-overlay style-color-wayh-bg" />
        <div className="mad-content no-pd">
          <div className="container">
            <HomeSections />
            {/* <HomeHero /> */}
            {/* <div className="mad-content no-pd">
          <div className="container">
            <DiscoverMenu />
            <MadSection />
            <HowItWorks />
            <BlogSection />
          </div>
          <AppSection />
        </div> */}

            {/* <FooterBanners /> */}
          </div>
        </div>

        <HomeBgImage />
        <div className="mad-content no-pd">
          <div className="container">
            <AnimationSection />
            <AnimationSection2 />
          </div>
        </div>
        {/* <BgImage2 /> */}
      </div>
    </Fragment>
  );
};

export default Home;
