import React from "react";

const FooterBanners = () => {
  return (
    <div className="mad-banners with-slide-down">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6 card-move-animation">
            <div className="mad-banner with-icon">
              <i className="mad-banner-icon">
                <img
                  src="yummi_svg_icons/delivery-new3.svg"
                  alt=""
                  className="svg"
                  loading="lazy"
                />
              </i>
              <div className="mad-banner-content">
                <h5 className="mad-page-title">
                  <span>Livraison rapide</span> garantie
                </h5>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 card-move-animation">
            <div className="mad-banner with-icon">
              <i className="mad-banner-icon">
                <img
                  src="yummi_svg_icons/24_7_preorder.svg"
                  alt=""
                  className="svg"
                  loading="lazy"
                />
              </i>
              <div className="mad-banner-content">
                <h5 className="mad-page-title">
                  <span>Les précommandes sont </span> disponibles
                </h5>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 card-move-animation">
            <div className="mad-banner with-icon">
              <i className="mad-banner-icon">
                <img
                  src="yummi_svg_icons/rewards_program.svg"
                  alt=""
                  className="svg"
                  loading="lazy"
                />
              </i>
              <div className="mad-banner-content">
                <h5 className="mad-page-title">
                  <span>Système de Points FID disponible </span> sur application
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanners;
