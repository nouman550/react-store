import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../actions/cartAction";
import { useLocation } from "react-router-dom";
import "./styles.css";

const Footer = () => {
  const [restInfo, setRestInfo] = useState([]);
  const [openingHours, setOpeningHours] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [popUpState, setPopUpState] = useState(true);
  const [closePopUpState, setClosePopUpState] = useState(true);
  const [oneTime, setOneTime] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [preOrderState, setPreOrderState] = useState(false);
  const location = useLocation();

  let dispatch = useDispatch();
  let countItem = useSelector((state) => state.cartReducer.count);
  let products = useSelector((state) => state.cartReducer.products);
  let imgPath = "https://food.powerbiz.fr/upload/";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants/6/opening_hours`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        setOpeningHours(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [oneTime]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants/6`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let response = res.data;
        return response;
      })
      .then((response) => {
        setRestInfo(response);
        setIsActive(response.is_active);
        setPreOrderState(response.accept_pre_order);
        setIsOpen(response.is_open);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [oneTime]);

  return (
    <Fragment>
      {!isActive && (
        <div className="restaurant-suspended">
          <div className="restaurant-suspended-container">
            <div className="restaurant-suspended-content text-center">
              <h1>Oups!</h1>
              <p>La page que vous recherchez est momentanément suspendu.</p>
              <p>
                Si vous êtes le propriétaire de ce nom de domaine,
                <br /> vous pouvez contacter le support
              </p>
              <p>
                PowerBiz.fr pour régler tout problème relatif à votre site web.
              </p>
              <img
                src="images/not_found.svg"
                alt="restaurant is suspended"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {isActive === false && closePopUpState && (
        <div id="page-popup" className="mad-page-popup">
          <div className="mad-popup-inner">
            <button id="mad-popup-close" className="arcticmodal-close">
              <i
                className="material-icons"
                onClick={() => {
                  setClosePopUpState(false);
                }}
              >
                close
              </i>
            </button>
            <div className="container">
              <div className="row">
                <div className="col-md-5 d-sm-none d-md-block">
                  <img src="images/closed.svg" alt="" loading="lazy" />
                </div>
                <div className="col-md-7 col-sm-12">
                  <h3 className="mad-page-title">
                    Notre restaurant est actuellement fermé
                  </h3>
                  <p>
                    Nous vous informons que notre restaurant est actuellement
                    fermé. <br />
                  </p>
                  <p>Vous pouvez tout de même consulter notre carte,</p>

                  <p className="content-element-4">
                    mais nous vous invitons à passer commande durant nos
                    horaires d'ouverture.
                  </p>
                  <Link
                    to="/menu"
                    className="btn btn-big btn-style-3"
                    onClick={() => {
                      setPopUpState(false);
                    }}
                  >
                    Voir la carte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {popUpState &&
        preOrderState === true &&
        isOpen === false &&
        (location.pathname === "/" || location.pathname === "/menu") && (
          <div id="page-popup" className="mad-page-popup">
            <div className="mad-popup-inner">
              <button id="mad-popup-close" className="arcticmodal-close">
                <i
                  className="material-icons"
                  onClick={() => {
                    setPopUpState(false);
                  }}
                >
                  close
                </i>
              </button>
              <div className="container">
                <div className="row">
                  <div className="col-md-5 d-sm-none d-md-none">
                    <img src="images/close.svg" alt="" loading="lazy" />
                  </div>
                  <div className="col-md-7 col-sm-12">
                    <h3 className="mad-page-title">Précommander?</h3>
                    <p>
                      Nous vous informons que votre restaurant sushi Street est
                      actuellement fermé.
                    </p>

                    <p className="content-element-4">
                      Cependant, Sushi-Street reste disponible à la précommande
                      sur notre site pour une livraison aux horaires de votre
                      choix.
                    </p>
                    <p className="content-element-4">
                      A bientôt chez sushi street !
                    </p>
                    <Link
                      to="/menu"
                      className="btn btn-big btn-style-3"
                      onClick={() => {
                        setPopUpState(false);
                      }}
                    >
                      Voir la carte
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {isActive === true || isOpen === true ? (
        <div className="mad-header-item">
          <div className="mad-actions">
            <div className="mad-item custom-shop-cart">
              <div className="mad-dropdown">
                <button
                  href="#"
                  type="button"
                  className="mad-item-link mad-dropdown-title"
                  onClick={() => setSideBar(true)}
                >
                  <i
                    className="material-icons-outlined"
                    onClick={() => setSideBar(false)}
                  >
                    shopping_cart
                  </i>
                  <span className="quantity">
                    {countItem > 0 ? countItem : "0"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <footer id="mad-footer" className="mad-footer">
        <div className="mad-footer-main">
          <div className="container">
            <div className="row vr-size-2">
              <div className="col-lg-4">
                <section className="mad-widget">
                  <h5 className="mad-widget-title">Horaires d'ouverture</h5>
                  <div className="mad-our-info vr-type content-element-4">
                    <div className="mad-info">
                      <ul>
                        <li>Lun-Ven 11:00 à 14:30 & 18:00 à 23:00</li>
                        <li>Sam-Dim 18:00 à 23:00</li>
                      </ul>
                    </div>
                  </div>
                  <div className="btn-set">
                    <Link
                      to="./menu"
                      className="btn btn-small text-gras menu-btn-style"
                    >
                      Commander
                    </Link>
                  </div>
                </section>
              </div>
              <div className="col-lg-4">
                <section className="mad-widget">
                  <h5 className="mad-widget-title">Liens utils</h5>
                  <div className="mad-our-info vr-type">
                    <div className="mad-info">
                      <span>
                        <Link to="/menu" className="mad-link mad-dir text-gras">
                          Commander
                        </Link>
                      </span>
                    </div>
                    <div className="mad-info">
                      <span>
                        <Link to="/contact" className="mad-link mad-dir">
                          Contact
                        </Link>
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-lg-4">
                <section className="mad-widget">
                  <h5 className="mad-widget-title">Nous contacter</h5>

                  <div className="mad-our-info vr-type">
                    <div className="mad-info">
                      <i className="material-icons-outlined">location_on</i>
                      <a
                        href="https://g.page/drancystreetsushi?share"
                        className="mad-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        253 avenue Jean Jaurès, <br /> 93700 Drancy, France
                      </a>
                    </div>
                    <div className="mad-info">
                      <i className="material-icons-outlined">call</i>
                      <a href="tel:+33141501313" className="mad-link">
                        01 41 50 13 13
                      </a>
                    </div>
                    <div className="mad-info">
                      <i className="material-icons">mail_outline</i>
                      <a
                        href="mailto: contact@sushistreet.com"
                        className="mad-link"
                      >
                        contact@sushistreet.com
                      </a>
                    </div>
                    <div className="mad-info">
                      <div className="mad-social-icons">
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
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="mad-footer-bottom">
          <div className="container">
            <p className="copyright-text mt-1 mt-md-0 mb-0">
              &copy; Sushi Street -{new Date().getFullYear()}. Site web réalisé
              par{" "}
              <a href="https://powerbiz.fr/" className="text-dark ">
                <img
                  src="images/powerbiz.png"
                  alt="powerbiz"
                  className="copyright-img"
                  loading="lazy"
                />
              </a>
            </p>
            <div className="mad-hr-list">
              <ul>
                <li>
                  <a
                    href="/p/cgv.html"
                    className="mad-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Conditions générales
                  </a>
                </li>
                <li>
                  <a
                    href="https://powerbiz.fr/p/privacy"
                    className="mad-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Politiques de confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div
        id="sidebar-navbar"
        className={`${sideBar === true ? "active" : ""}`}
      >
        <div className="sidebar-cart-top">
          <h5 className="m-0">Mon panier</h5>
          <button className="sidebar-close" onClick={() => setSideBar(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        {}
        <div className="sidebar-item-view">
          {products &&
            Object.values(products).length > 0 &&
            Object.values(products).map((product, i) => (
              <div key={product.order_item_id} className="sidebar-cart-item">
                <img
                  src={`${imgPath}${product.photo} `}
                  alt={product.item_name}
                  loading="lazy"
                />
                <div className="cart-content">
                  <p className="m-0">{product.item_name}</p>
                  <span>
                    {product.qty} x {product.price}€
                  </span>
                </div>
                <span
                  className="custom-cart-close"
                  onClick={() => {
                    dispatch(removeFromCart(product.order_item_id));
                  }}
                >
                  <i className="fas fa-times"></i>
                </span>
              </div>
            ))}
        </div>
        <div className="sidebar-cart-bottom">
          <Link
            to="./checkout"
            className="btn btn-primary w-100 mb-2"
            onClick={() => {
              window.scrollTo(0, 0);
              setSideBar(false);
            }}
          >
            Valider
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
