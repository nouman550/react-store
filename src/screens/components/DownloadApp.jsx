import React, { useState } from "react";

const DownloadApp = () => {
  const [display, setDisplay] = useState(true);
  const androidOrIOS = () => {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      return "Android";
    }
    if (/iPad|iPhone|iPod/i.test(userAgent)) {
      return "IOS";
    } else return false;
  };

  if (androidOrIOS() !== false) {
    return (
      display === true && (
        <div className="app-benner" id="app-banner" style={{ height: "72px" }}>
          <div className="close-button" id="close_app_banner">
            <i
              className="fas fa-times"
              onClick={() => {
                setDisplay(false);
              }}
            ></i>
          </div>
          <div className="app-logo">
            <img src="images/app-1.png" />
          </div>
          <div className="app-info">
            <div className="app-title">
              <h3 id="app-title-h">Sushi Street pour {androidOrIOS()}</h3>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
          <div className="download-button-banner">
            {androidOrIOS() === "IOS" ? (
              <a
                href="https://apps.apple.com/us/app/sushi-street-france/id1609611362"
                target="_blank"
                type="button"
                className="btn btn-style-3 btn-small null"
                rel="noreferrer"
              >
                Installer
              </a>
            ) : (
              <a
                href="https://play.google.com/store/apps/details?id=fr.power.sushistreet"
                target="_blank"
                type="button"
                className="btn btn-style-3 btn-small null"
                rel="noreferrer"
              >
                Installer
              </a>
            )}
          </div>
        </div>
      )
    );
  } else return <div></div>;
};

export default DownloadApp;
