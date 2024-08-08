import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import "./styles.css";

const Contact = () => {
  const [formData, setFormData] = useState([]);
  const handleFormChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const validForm = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify({
        email_from: formData.email,
        email_to: "contact@sushistreet.com",
        name: formData.name,
        telephone: formData.tel,
        object: "Sushi Street Website",
        message: formData.message,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/sendEmail`, requestOptions)
      .then(() => {
        toast.success(`Votre email a été envoyé`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Sushi Street</title>
        <meta
          name="description"
          content="Suggestion, réclamation ou partenariat … Nous répondons à toutes vos demandes par email, par téléphone ou via notre formulaire de contact."
        />
      </Helmet>
      <div className="mad-breadcrumb with-bg-image bg-contact">
        <div className="container">
          <h1 className={`mad-page-title  `}>CONTACTEZ-NOUS</h1>
        </div>
        {/* <div className="block-bg-overlay style-color-wayh-bg" /> */}
      </div>

      <div className="mad-content">
        <div className="container">
          <div className="mad-section">
            <p className="align-center">
              Si vous avez une demande, écrivez-nous en remplissant le
              formulaire ci-dessous :
            </p>
          </div>

          <div className="mad-section mad-section--stretched ">
            <div className="row">
              <div className="col-12">
                {/* <h2 className="align-center">Nous contacter</h2> */}

                <form className="row mad-contact-form type-2">
                  <div className="col-md-6 pb-16">
                    <input
                      type="text"
                      id="cf_name"
                      name="cf_name"
                      required
                      placeholder="Nom & Prénom"
                      onChange={handleFormChange("name")}
                    />
                  </div>
                  <div className="col-md-6 pb-16">
                    <input
                      type="email"
                      id="cf_email"
                      name="cf_email"
                      required
                      placeholder="Email"
                      onChange={handleFormChange("email")}
                    />
                  </div>
                  <div className="col-md-6 pb-16">
                    <input
                      type="tel"
                      id="cf_phone"
                      name="cf_phone"
                      required
                      placeholder="Téléphone"
                      onChange={handleFormChange("tel")}
                    />
                  </div>
                  <div className="col-md-6 pb-16">
                    <input
                      type="tel"
                      id="cf_phone"
                      name="cf_phone"
                      required
                      placeholder="Object"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      rows="8"
                      id="message"
                      name="cf_message"
                      required
                      placeholder="Message"
                      onChange={handleFormChange("message")}
                    ></textarea>
                  </div>
                  <div className="mad-col align-center">
                    <button
                      type="submit"
                      className="menu-btn-style"
                      onClick={validForm}
                    >
                      <span>Envoyer</span>
                    </button>
                  </div>
                </form>
              </div>
              {/* <div className="col-12">
                <h2 className="mad-page-title">Nous trouver</h2>
                <div className="content-element-4">
                  <div className="mad-our-info size-2 vr-type">
                    <div className="mad-info">
                      <i className="material-icons-outlined">location_on</i>{" "}
                      <span>
                        253 avenue Jean Jaurès, <br /> 93700 Drancy, France
                        <a
                          href="https://g.page/drancystreetsushi?share"
                          className="mad-link mad-dir color-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Localisation Maps
                        </a>
                      </span>
                    </div>
                    <div className="mad-info">
                      <i className="material-icons-outlined">call</i>{" "}
                      <a style={{ color: "#fff" }} href="tel:+33141501313">
                        +33 1 41 50 13 13
                      </a>
                    </div>
                    <div className="mad-info">
                      <i className="material-icons">mail_outline</i>{" "}
                      <a
                        href="mailto: contact@sushistreet.com"
                        className="mad-link color-2"
                      >
                        contact@sushistreet.com
                      </a>
                    </div>
                    <div className="mad-info">
                      <i className="material-icons">access_time</i>{" "}
                      <span>
                        Lun-Ven 11:00 à 14:30 & 18:00 à 23:00 <br /> Sam-Dim
                        18:00 à 23:00
                      </span>
                    </div>
                  </div>
                </div>
                <h5>Nous suivre</h5>
                <div className="mad-social-icons style-2 size-big">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/sushistreetfrance"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.instagram.com/sushi_street/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.snapchat.com/add/fafastreet"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-snapchat-ghost"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
          <div className="mad-section">
            <div className="row justify-content-center">
              <div className="col-xl-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
