import React, { useState, Fragment } from "react";
import ModalMenu from "./ModalMenu";
import { CardBody, CardContainer, CardItem } from "./3DCard";
import "./styles.css";

const DiscoverMenuProduct = ({ product, disabled, preOrderState, index }) => {
  let imgPath = "https://food.powerbiz.fr/upload/" + product[1].photo;
  const [openModal, setOpenModal] = useState(false);

  const sendDataToParent = (st) => {
    setOpenModal(st);
  };

  return (
    <Fragment>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            <div
              className={`mad-grid-item mad-category-burgers ${
                index === 2 || index === 3 ? "d-sm-none d-md-block" : "d-block"
              } `}
            >
              <div className="mad-product">
                <figure className="mad-product-image">
                  <a href="#">
                    <img
                      src={imgPath}
                      alt={product[1].item_name}
                      loading="lazy"
                    />
                  </a>
                </figure>

                <div className="mad-product-description">
                  <h4 className="mad-product-title">
                    <a href="#" className="mad-link">
                      {product[1].item_name}
                    </a>
                  </h4>
                  <p>{product[1].item_description}</p>
                </div>

                <div className="mad-product-calc">
                  <span className="mad-product-price">
                    {product[1].price.length === 1 && (
                      <span>{product[1].price}€</span>
                    )}
                    {typeof product[1].price.length === "undefined" &&
                      Object.values(product[1].price).map((price, i) => (
                        <span>{price}€</span>
                      ))}
                  </span>
                  <button
                    className={`btn btn-style-3 btn-small menu-btn-style ${
                      disabled === true && preOrderState === false
                        ? "disabled"
                        : null
                    }`}
                    onClick={() => {
                      if (disabled === true && preOrderState === false) {
                        return;
                      } else {
                        setOpenModal(true);
                      }
                    }}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
            {openModal && (
              <ModalMenu
                product={product}
                sendDataToParent={sendDataToParent}
                index="1"
              />
            )}
          </CardItem>
        </CardBody>
      </CardContainer>
    </Fragment>
  );
};

export default DiscoverMenuProduct;
