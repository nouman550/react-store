import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addToCart } from "./../../actions/cartAction";
import CustomModal from "./CustomModal";
import PreLoader from "./Preloader";
import SubCategory from "./SubCategory";

const ModalMenu = ({ product, sendDataToParent, index }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [hasCategories, setHasCategories] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [selectedSubItems, setSelectedSubItems] = useState([]);
  const [preloaderState, setPreloaderState] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  let imgPath = "https://food.powerbiz.fr/upload/";
  let dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/items/${product[index].item_id}/ingredients`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product, index]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/restaurants/6/items/${product[index].item_id}/sub_categories`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          setHasCategories(1);
        } else {
          setHasCategories(2);
          setPreloaderState(false);
        }
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product, index]);

  const preloaderCallBack = (state) => {
    setPreloaderState(state);
  };

  const setSelectedSubItemsCallBack = (
    subCatId,
    subItemId,
    multiple_options,
    custom_options,
    addonName,
    addonCategory,
    addonPrice
  ) => {
    if (multiple_options) {
      let obj = selectedSubItems.find((o) => o.sub_item_id === subItemId);

      if (!obj) {
        setSelectedSubItems([
          ...selectedSubItems,
          {
            subcat_id: subCatId,
            sub_item_id: subItemId,
            addon_name: addonName,
            addon_category: addonCategory,
            addon_price: addonPrice,
            addon_qty: 1,
          },
        ]);
      } else {
        setSelectedSubItems(
          selectedSubItems.filter((item) => item.sub_item_id !== subItemId)
        );
      }
    } else {
      let obj = selectedSubItems.find((o) => o.subcat_id === subCatId);
      if (!obj) {
        setSelectedSubItems([
          ...selectedSubItems,
          {
            subcat_id: subCatId,
            sub_item_id: subItemId,
            addon_name: addonName,
            addon_category: addonCategory,
            addon_price: addonPrice,
            addon_qty: 1,
          },
        ]);
      } else {
        let filteredItems = selectedSubItems.filter(
          (item) => item.subcat_id !== subCatId
        );
        setSelectedSubItems([
          ...filteredItems,
          {
            subcat_id: subCatId,
            sub_item_id: subItemId,
            addon_name: addonName,
            addon_category: addonCategory,
            addon_price: addonPrice,
            addon_qty: 1,
          },
        ]);
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    sendDataToParent(false);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const checkRequiredCategories = () => {
    let requiredCategories = subCategories.filter(
      (category) => category.required !== false
    );

    let filterRequiredCategories = requiredCategories.filter((category) => {
      let selectedItems = selectedSubItems.filter(
        (item) => item.subcat_id === category.subcat_id
      );
      return selectedItems.length === 0;
    });

    if (filterRequiredCategories.length > 0) {
      toast.warn(
        `Le choix de ${filterRequiredCategories[0].subcategory_name} est obligatoire`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return false;
    }
    return true;
  };

  const addProductToCart = () => {
    const sub_items = selectedSubItems.map((item) => ({
      ...item,
      addon_qty: counter,
    }));
    if (checkRequiredCategories()) {
      let { item_id, item_name, photo } = product[index];
      let cartProduct = {
        item_id,
        item_name,
        photo,
        order_item_id: parseInt(item_id) + Math.floor(Math.random() * 1000),
        price: product[index].price[0],
        qty: counter,
        cat_id: product[index].category[0],
        addon: sub_items,
        order_notes: "",
        normal_price: product[index].price[0],
        discounted_price: product[index].price[0],
        size: 0,
        size_id: 0,
        ingredients: selectedIngredients,
      };
      dispatch(addToCart(cartProduct));
      toast.success("Produit ajouté à votre panier", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.gtag_report_conversion();
      closeModal();
    }
  };

  return (
    <>
      <CustomModal isOpen={true} onClose={closeModal}>
        <div className="menu-title-block">
          <span>{product[index].item_name}</span>
          <h3 className="product-price primary-color">
            {product[index].price.length === 1 && (
              <span>{product[index].price}€</span>
            )}
            {typeof product[index].price.length === "undefined" &&
              Object.values(product[index].price).map((price, i) => (
                <span key={price}>{price}€</span>
              ))}
          </h3>
        </div>
        <PreLoader display={preloaderState ? "d-block" : "d-none"} />
        <div className="modal-menu">
          <p className="product-desc">{product[index].item_description}</p>
          {ingredients.length > 0 && <h5>Ingrédients de moins?</h5>}
          {ingredients.length > 0 && (
            <ul className="mad-filter custom-filter justify-content-center">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient.ingredients_id}
                  className={`nav-item ${
                    selectedIngredients.includes(ingredient.ingredients_name)
                      ? "mad-active"
                      : ""
                  }`}
                  onClick={() => {
                    selectedIngredients.includes(ingredient.ingredients_name)
                      ? setSelectedIngredients(
                          selectedIngredients.filter(
                            (item) => item !== ingredient.ingredients_name
                          )
                        )
                      : setSelectedIngredients([
                          ...selectedIngredients,
                          ingredient.ingredients_name,
                        ]);
                  }}
                >
                  <a href="#">{ingredient.ingredients_name}</a>
                </li>
              ))}
            </ul>
          )}
          {subCategories.length > 0 && (
            <>
              {subCategories.map((category) => (
                <SubCategory
                  key={category.subcat_id}
                  category={category}
                  productId={product[index].item_id}
                  setSelectedSubItemsCallBack={setSelectedSubItemsCallBack}
                  preloaderCallBack={preloaderCallBack}
                />
              ))}
            </>
          )}
          {hasCategories === 2 && (
            <div className="img-container d-flex justify-content-center align-items-center">
              <img
                src={`${imgPath}${product[index].photo}`}
                alt={product[index].item_description}
              />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger close-modal-button"
            onClick={closeModal}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="product-bottom custom m-auto">
            <div className="product-count">
              <span
                className={`minus ${counter === 1 ? "minus-off" : ""}`}
                onClick={decrementCounter}
              >
                -
              </span>
              <label className="counter-text">{counter}</label>
              <span className="plus" onClick={incrementCounter}>
                +
              </span>
            </div>
          </div>
          <button className="btn btn-success" onClick={addProductToCart}>
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default ModalMenu;
