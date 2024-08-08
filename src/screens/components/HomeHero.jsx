/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const HomeHero = () => {
  return (
    <div>
      <div className="container">
        <div className="mad-menu-box with-slide-top d-sm-none">
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/sushi.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">Japonais</h6>
            </a>
          </div>
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/chinese.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">Chinois</h6>
            </a>
          </div>
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/menus.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">Menus</h6>
            </a>
          </div>
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/accompagnements.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">
                Accompag-
                <br />
                nements
              </h6>
            </a>
          </div>
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/boissons.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">Boissons</h6>
            </a>
          </div>
          <div className="mad-col">
            <a href="#" className="mad-menu-item">
              <i className="mad-menu-icon">
                <img
                  className="svg hover-image-animation"
                  src="yummi_svg_icons/desserts.png"
                  alt=""
                  loading="lazy"
                />
              </i>
              <h6 className="mad-menu-title">Desserts</h6>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
