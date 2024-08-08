import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeFromCart } from "../../actions/cartAction";
import { removeAllProducts } from "./../../actions/cartAction";
import "./styles.css";

import PaypalProvider from "./PaypalProvider";
import Preloader3 from "./Preloader3";

const CartSummary = () => {
  const [formData, setFormData] = useState({
    deliveryType: "delivery",
  });
  const [tel, setTel] = useState("");
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [deliveryType, setDeliveryType] = useState("");
  const [orderInfo, setOrderInfo] = useState({});
  const [startAddress, setStartAddress] = useState("");
  const [selectedMobileNumber, setSelectedMobileNumber] = useState("+33");
  const [orderReadyToSubmit, setOrderReadyToSubmit] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [zones, setZones] = useState([]);
  const [city, setCity] = useState("");
  const [minOrder, setMinOrder] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [freeAbove, setFreeAbove] = useState(0);
  const [orderTime, setOrderTime] = useState("LATER");
  const [openingHours, setOpeningHours] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(0);
  const [deliveryHour, setDeliveryHour] = useState(0);
  const [deliveryMinute, setDeliveryMinute] = useState(0);
  const [success, setSuccess] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [preloaderState, setPreloaderState] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [paypalOrderId, setPaypalOrderId] = useState();

  const today = new Date();
  let tomorrow = new Date();

  let dispatch = useDispatch();
  let products = useSelector((state) => state.cartReducer.products);
  let imgPath = "https://food.powerbiz.fr/upload/";

  const calculTotalPrice = () => {
    let price = 0.0;
    if (products) {
      products.forEach((product) => {
        let sub_price = 0.0;
        let addonsPrice = 0.0;
        sub_price = product.qty * parseFloat(product.price);
        if (product.addon !== undefined) {
          product.addon.forEach((addon) => {
            if (!isNaN(parseFloat(addon.addon_price)))
              addonsPrice =
                addonsPrice + product.qty * parseFloat(addon.addon_price);
          });
        }

        price = price + sub_price + addonsPrice;
      });
    }
    setTotalPrice(price);
    return price;
  };

  useEffect(() => {
    if (success) {
      // validOrder(null, 'paypal_v2');
      console.log("success");
    }
  }, [success]);

  useEffect(() => {
    if (
      deliveryType !== "" &&
      formData.name !== undefined &&
      formData.last_name !== undefined &&
      formData.email_address !== undefined &&
      tel !== undefined &&
      formData.deliveryType !== undefined &&
      formData.name !== "" &&
      formData.email_address !== "" &&
      formData.last_name !== "" &&
      tel !== "" &&
      formData.deliveryType !== "" &&
      (formData.deliveryType !== "pickup"
        ? parseFloat(totalPrice) > parseFloat(minOrder)
        : true) &&
      products
    ) {
      if (formData.deliveryType === "delivery" && startAddress === "") {
        setOrderReadyToSubmit(false);
        return;
      } else if (orderTime === "LATER") {
        if (deliveryDate === 0 || deliveryHour === 0) {
          setOrderReadyToSubmit(false);
          return;
        } else {
          if (tel.length > 10 || tel.length < 9) {
            setOrderReadyToSubmit(false);
            return;
          } else {
            setOrderReadyToSubmit(true);
            return;
          }
        }
      } else if (orderTime === "ASAP") {
        if (tel.length > 10 || tel.length < 9) {
          setOrderReadyToSubmit(false);
          return;
        } else {
          setOrderReadyToSubmit(true);
          return;
        }
      }
    } else {
      setOrderReadyToSubmit(false);
    }
  }, [
    deliveryType,
    formData,
    products,
    tel,
    startAddress,
    orderTime,
    deliveryDate,
    deliveryHour,
    deliveryMinute,
    minOrder,
    totalPrice,
  ]);

  useEffect(() => {
    calculTotalPrice();
  }, [products]);

  const changeDeliveryCity = (city) => {
    if (city === "init") {
      setDeliveryFee(0);
      setMinOrder(0);
      setFreeAbove(0);
    }
    const selectedCity = zones.find(({ name }) => name === city);
    setCity(city);
    setDeliveryFee(selectedCity?.fee);
    setMinOrder(parseFloat(selectedCity?.minimum_order).toFixed(2));
    setFreeAbove(selectedCity?.free_above_subtotal);
  };

  const getOpeningHours = (day) => {
    if (day === "today") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/restaurants/6/today-working-hours`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        )
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
    } else if (day === "tomorrow") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/restaurants/6/tomorrow-working-hours`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        )
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
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/restaurants/6/states/2/cities`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      })
      .then((res) => {
        let response = res.data;
        return response;
      })
      .then((response) => {
        setZones(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setIsOpen(response.is_open);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products]);

  useEffect(() => {
    const current = new Date();

    let date = "";

    if (orderTime === "LATER") {
      date = `${current.getFullYear()}-${current.getMonth() + 1
        }-${deliveryDate}`;
    } else {
      date = `${current.getFullYear()}-${current.getMonth() + 1
        }-${current.getDate()}`;
    }

    let newProductsArray = [];

    if (products) {
      if (
        parseFloat(totalPrice).toFixed(2) >= 20 &&
        parseFloat(totalPrice).toFixed(2) < 25
      ) {
        newProductsArray = [
          ...products,
          {
            item_id: "268",
            cat_id: "48",
            normal_price: "0",
            price: "0",
            discounted_price: "0",
            item_name: "Une paire de sushi saumon offerte",
            order_notes: "",
            qty: 1,
            size: 0,
            size_id: 0,
          },
        ];
      } else if (parseFloat(totalPrice).toFixed(2) >= 25) {
        newProductsArray = [
          ...products,
          {
            item_id: "269",
            cat_id: "48",
            normal_price: "0",
            price: "0",
            discounted_price: "0",
            item_name: "Une paire de sushi california offerte",
            order_notes: "",
            qty: 1,
            size: 0,
            size_id: 0,
          },
        ];
      } else {
        newProductsArray = [...products];
      }
    }

    setOrderInfo({
      first_name: formData.name,
      last_name: formData.last_name,
      email_address: formData.email_address,
      street: startAddress,
      city: city,
      state: "Ile de France",
      zipcode: 0,
      country: "France",
      google_lat: formData.address_lat || 48.849249,
      google_lng: formData.address_lng || 2.303089,
      contact_phone: selectedMobileNumber + tel,
      merchant_id: 6,
      request_from: "single_web",
      trans_type: formData.deliveryType,
      payment_type: formData.paymentType,
      delivery_time: deliveryHour + ":" + deliveryMinute,
      delivery_date: date,
      delivery_instruction: formData.notes !== undefined ? formData.notes : "",
      delivery_asap: orderTime === "ASAP" ? 1 : 0,
      dinein_special_instruction: "",
      dinein_table_number: "",
      dinein_number_of_guest: deliveryType === "surPlace" ? 2 : "",
      delivery_charge: 0,
      sub_total: parseFloat(totalPrice).toFixed(2),
      total_w_tax: parseFloat(totalPrice).toFixed(2),
      items: newProductsArray,
    });
  }, [
    deliveryType,
    formData,
    startAddress,
    products,
    tel,
    selectedMobileNumber,
    city,
    totalPrice,
    deliveryDate,
    deliveryHour,
    deliveryMinute,
    orderTime,
  ]);

  const handleStartAddressChange = (address) => {
    setStartAddress(address);
  };

  const handleSelectStartAddress = (address) => {
    setStartAddress(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setFormData({
          ...formData,
          address_lng: latLng.lng,
          address_lat: latLng.lat,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  const handleTelChange = (e) => {
    if (e.target.value.length === 10) {
      let telNoZero = e.target.value.substring(1);
      setTel(telNoZero);
    } else {
      setTel(e.target.value);
    }
  };

  const handleFormChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const successCallBack = (state) => {
    setSuccess(state);
  };

  const paypalMessageErrorCallBack = (state) => {
    setPaypalErrorMessage(state);
  };

  const payWithPayPlug = (orderID) => {
    const data = {
      amount: parseInt((parseFloat(totalPrice) * 100).toFixed(0)),
      currency: "EUR",
      hosted_payment: {
        return_url: `${process.env.REACT_APP_LIVE_URL}/validate-pay-plug-payment?order_id=${orderID}`,
        cancel_url: `${process.env.REACT_APP_LIVE_URL}/checkout`,
      },
      notification_url: `https://api.powerbiz.fr/website_api/public/restaurants/6/orders/${orderID}/notify`,
      save_card: false,
      force_3ds: true,
      metadata: {
        order_id: orderID,
      },
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${process.env.REACT_APP_PAY_PLUG_TOKEN}`,
      },
      body: JSON.stringify(data),
    };
    fetch("https://sushi-street.com/payplug-php-api/index.php", requestOptions)
      .then((response) => {
        debugger;
        return response.json();
      })
      .then((res) => {
        let payPlugUrl = res.hosted_payment.payment_url;
        fetch(
          `${process.env.REACT_APP_API_URL}/restaurants/6/orders/${orderID}/addPayPlug`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pay_plug_id: res.id }),
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.state === true) {
              window.location.assign(payPlugUrl);
            }
          })
          .catch((err) => {
            debugger;
            toast.warn(
              `Une erreur est survenue. Veuillez rafraichir la page ou réessayer ultérieurement.
          Si le problème persiste, n'hésitez pas à appeler directement notre restaurant durant nos horaires d'ouverture.`,
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
            setPreloaderState(false);
            console.log(err);
          });
      })
      .catch((err) => {
        debugger;
        toast.warn(
          `Une erreur est survenue. Veuillez rafraichir la page ou réessayer ultérieurement.
        Si le problème persiste, n'hésitez pas à appeler directement notre restaurant durant nos horaires d'ouverture.`,
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
        setPreloaderState(false);
        console.log(err);
      });
  };

  const payWithPaypal = (orderId) => {
    setPaypalOrderId(orderId);
  };

  const validOrder = (e, paymentType) => {
    setPreloaderState(true);
    if (e !== null) {
      e.preventDefault();
    }
    // debugger;
    let order = { ...orderInfo, payment_type: paymentType };

    if (orderReadyToSubmit) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: JSON.stringify(order),
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/restaurants/6/orders/addOrder`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (paymentType === "vog") {
            payWithPayPlug(res.order_id);
          } else if (paymentType === "paypal_v2") {
            payWithPaypal(res.order_id);
            setPreloaderState(false);
          } else {
            setOrderId(res.order_id);
            setPreloaderState(false);
            dispatch(removeAllProducts());
          }
        })
        .catch((err) => {
          debugger;
          toast.warn(
            `Une erreur est survenue. Veuillez rafraichir la page ou réessayer ultérieurement.
          Si le problème persiste, n'hésitez pas à appeler directement notre restaurant durant nos horaires d'ouverture.`,
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
          setPreloaderState(false);
          console.log(err);
        });
    } else {
      toast.warn(
        `Vous avez oublié de sélectionner ou de renseigner des champs obligatoires`,
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
      setPreloaderState(false);
    }
  };

  if (orderId === 0) {
    return products && products.length > 0 ? (
      <div>
        <Preloader3 display={preloaderState} />
        <div className="mad-content no-pd" style={{ paddingTop: "135px" }}>
          <div className="container">
            <div className="mad-section">
              {products.length > 0 && (
                <div className="content-element-15">
                  <div className="validate-order-box validate-order-box-no-bottom-margin container">
                    <div
                      role="alert"
                      class="mad-alert-box mad-alert-box--warning"
                    >
                      <div class="mad-alert-box-inner">
                        <p className="text-center">
                          Recevez gratuitement une paire de Sushi Saumon pour
                          chaque commande de 20€ ou plus
                        </p>
                        <p className="text-center"> Ou</p>
                        <p className="text-center">
                          6 California Poulet Mayo pour chaque commande de plus
                          de 25€
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mad-table-wrap shop-cart-form">
                    <table className="mad-table--responsive-md cart-summary">
                      <thead>
                        <tr className="bg">
                          <th>Produit</th>
                          <th>Prix</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          Object.values(products).length > 0 &&
                          Object.values(products).map((product, i) => (
                            <tr key={i} className="mad-product-item">
                              <td data-cell-title="Produit">
                                <div className="mad-products mad-product-small">
                                  <div className="mad-col">
                                    <div className="mad-product">
                                      <a href="#" className="mad-product-image">
                                        <img
                                          src={`${imgPath}${product.photo}`}
                                          loading="lazy"
                                          alt={product.item_name}
                                        />
                                      </a>

                                      <div className="mad-product-description">
                                        <h5 className="mad-product-title">
                                          <p>{product.item_name}</p>
                                        </h5>
                                        {product.addon !== undefined &&
                                          Object.values(product.addon).length >
                                          0 &&
                                          Object.values(product.addon).map(
                                            (addon, i) => (
                                              <p key={i}>{addon.addon_name}</p>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td data-cell-title="Prix">
                                <span className="mad-product-price">
                                  {product.qty} x {product.price}€
                                </span>
                                {product.addon !== undefined &&
                                  Object.values(product.addon).length > 0 &&
                                  Object.values(product.addon).map(
                                    (addon, i) => (
                                      <p key={i} className="addon-price">
                                        {product.qty} x{" "}
                                        {addon.addon_price === ""
                                          ? "0"
                                          : addon.addon_price}
                                        €
                                      </p>
                                    )
                                  )}
                              </td>

                              <td
                                className="shopping-cart-full"
                                data-cell-title="Action"
                              >
                                <button
                                  className="mad-close-item"
                                  onClick={() => {
                                    dispatch(
                                      removeFromCart(product.order_item_id)
                                    );
                                  }}
                                >
                                  SUPPRIMER
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg">
                          <th>Total</th>
                          <th className="text-danger">
                            {parseFloat(totalPrice).toFixed(2) + "€"}
                          </th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {deliveryType === "livraison" &&
                    parseFloat(totalPrice) < parseFloat(minOrder) && (
                      <div className="validate-order-box validate-order-box-no-margin container">
                        <div
                          role="alert"
                          class="mad-alert-box mad-alert-box--error"
                        >
                          <div class="mad-alert-box-inner">
                            <p className="text-center">
                              Le minimum de commande en livraison à {city} est
                              de {parseFloat(minOrder).toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}

              <div className="vr-size-5 checkout-info col-no-space">
                <h5 className="text-center">
                  Sélectionnez le type de votre commande
                </h5>
                <div className="d-flex justify-content-around delivery-type">
                  <div className="d-type">
                    <label
                      className={`${deliveryType === "livraison"
                          ? "active menu-btn-style"
                          : ""
                        }${deliveryType === "" ? "shake-animation" : ""} `}
                      onClick={() => {
                        setDeliveryType("livraison");
                        setFormData({
                          ...formData,
                          deliveryType: "delivery",
                        });
                        changeDeliveryCity(zones[0].name);
                      }}
                    >
                      Livraison
                    </label>
                  </div>
                  <div className="d-type">
                    <label
                      className={`${deliveryType === "emporter"
                          ? "menu-btn-style active"
                          : ""
                        }${deliveryType === "" ? "shake-animation" : ""}`}
                      onClick={() => {
                        setDeliveryType("emporter");
                        setFormData({
                          ...formData,
                          deliveryType: "pickup",
                        });
                        changeDeliveryCity("init");
                      }}
                    >
                      À Emporter
                    </label>
                  </div>
                </div>
                {deliveryType !== "" && (
                  <div className="row">
                    <div className="col-lg-6 checkout-form">
                      <form className="mad-contact-form type-2 var2">
                        <div className="mad-col color-white">
                          <label>
                            Nom
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Nom "
                            onChange={handleFormChange("last_name")}
                          />
                        </div>
                        <div className="mad-col">
                          <label>
                            Prénom
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Prénom "
                            onChange={handleFormChange("name")}
                          />
                        </div>
                        <div className="mad-col">
                          <label>
                            Email
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Email "
                            onChange={handleFormChange("email_address")}
                          />
                        </div>
                        <div className="mad-col">
                          <label>
                            Téléphone
                            <span>*</span>
                          </label>
                          <div className="d-flex mb-3 mad-custom-select-2">
                            <select
                              className="me-sm-1 international-phone-number-drop-down"
                              value={selectedMobileNumber}
                              onChange={(e) => {
                                setSelectedMobileNumber(e.target.value);
                              }}
                              id="prefix"
                            >
                              <option value="+33" defaultValue>
                                🇫🇷 +33
                              </option>
                              <option value="+31">🇳🇱 +31</option>
                              <option value="+32">🇧🇪 +32 </option>
                              <option value="+34">🇪🇸 +34</option>
                              <option value="+39">🇮🇹 +39</option>
                              <option value="+40">🇷🇴 +40</option>
                              <option value="+43">🇦🇹 +43</option>
                              <option value="+45">🇩🇰 +45</option>
                              <option value="+46">🇸🇪 +46</option>
                              <option value="+47">🇳🇴 +47</option>
                              <option value="+48">🇵🇱 +48</option>
                              <option value="+49">🇩🇪 +49</option>
                              <option value="+351">🇵🇹 +351</option>
                              <option value="+354">🇮🇸 +354</option>
                              <option value="+352">🇱🇺 +352</option>
                              <option value="+353">🇮🇪 +353</option>
                              <option value="+356">🇲🇹 +356</option>
                              <option value="+357">🇨🇾 +357</option>
                              <option value="+358">🇫🇮 +358</option>
                              <option value="+359">🇧🇬 +359</option>
                              <option value="+370">🇱🇹 +370</option>
                              <option value="+371">🇱🇻 +371</option>
                              <option value="+372">🇪🇪 +372</option>
                              <option value="+386">🇸🇮 +386</option>
                              <option value="+421">🇸🇰 +421</option>
                              <option value="+423">🇱🇮 +423</option>
                            </select>
                            <div className="tel-input">
                              <input
                                type="number"
                                id="phone"
                                onChange={handleTelChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mad-col">
                          <label>Pour quand ?</label>
                          <div className="d-flex justify-content-around delivery-type">
                            <div className="d-type">
                              <label
                                className={`mb-2 ${orderTime === "LATER"
                                    ? "active menu-btn-style"
                                    : ""
                                  }`}
                                onClick={() => {
                                  setOrderTime("LATER");
                                }}
                              >
                                Pré-commander
                              </label>
                            </div>
                            {/* {isOpen && ( */}
                            {isOpen && (
                              <div className="d-type">
                                <label
                                  className={`mb-2 ${orderTime === 'ASAP'
                                      ? 'active menu-btn-style'
                                      : ''
                                    }`}
                                  onClick={() => {
                                    setOrderTime('ASAP');
                                  }}
                                >
                                  Commande immédiate
                                </label>
                              </div>
                            )}
                            {/* )} */}
                          </div>
                          {orderTime === "LATER" && (
                            <div className="delivery-hour">
                              <label>Quel jour ?</label>
                              <div className="d-flex justify-content-around delivery-type">
                                <div className="d-type">
                                  <label
                                    className={`${deliveryDate === today.getDate()
                                        ? "active"
                                        : ""
                                      }`}
                                    onClick={() => {
                                      setDeliveryDate(today.getDate());
                                      getOpeningHours("today");
                                    }}
                                  >
                                    Aujourd'hui
                                  </label>
                                </div>
                                <div className="d-type">
                                  <label
                                    className={`${deliveryDate === today.getDate() + 1
                                        ? "active menu-btn-style"
                                        : ""
                                      }`}
                                    onClick={() => {
                                      tomorrow.setDate(today.getDate() + 1);
                                      setDeliveryDate(tomorrow.getDate());
                                      getOpeningHours("tomorrow");
                                    }}
                                  >
                                    Demain
                                  </label>
                                </div>
                              </div>
                              {deliveryDate !== 0 && (
                                <div className="row">
                                  <div className="col-8">
                                    <label>heure ?</label>
                                    <div className="d-flex  wrap">
                                      {openingHours.map((hour, i) => (
                                        <div key={i} className="d-type">
                                          <label
                                            className={`${deliveryHour === hour
                                                ? "active"
                                                : ""
                                              }`}
                                            onClick={() => {
                                              setDeliveryHour(hour);
                                            }}
                                          >
                                            {hour}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <label>Minute ?</label>
                                    <div className="d-flex wrap">
                                      <div className="d-type">
                                        <label
                                          className={`${deliveryMinute === 0
                                              ? "active menu-btn-style"
                                              : ""
                                            }`}
                                          onClick={() => {
                                            setDeliveryMinute(0);
                                          }}
                                        >
                                          00
                                        </label>
                                      </div>
                                      <div className="d-type">
                                        <label
                                          onClick={() => {
                                            setDeliveryMinute(15);
                                          }}
                                          className={`${deliveryMinute === 15
                                              ? "active"
                                              : ""
                                            }`}
                                        >
                                          15
                                        </label>
                                      </div>
                                      <div className="d-type">
                                        <label
                                          className={`${deliveryMinute === 30
                                              ? "active"
                                              : ""
                                            }`}
                                          onClick={() => {
                                            setDeliveryMinute(30);
                                          }}
                                        >
                                          30
                                        </label>
                                      </div>
                                      <div className="d-type">
                                        <label
                                          className={`${deliveryMinute === 45
                                              ? "active"
                                              : ""
                                            }`}
                                          onClick={() => {
                                            setDeliveryMinute(45);
                                          }}
                                        >
                                          45
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6">
                      <div className="content-element-15">
                        <div className="form-control content-element-4">
                          <form className="mad-contact-form type-2 var2">
                            {deliveryType === "livraison" && (
                              <Fragment>
                                <div className="mad-col color-white">
                                  <label>
                                    Zone de livraison
                                    <span>*</span>
                                  </label>
                                  <div className="mad-custom-select">
                                    <select
                                      name="zone"
                                      id="zone"
                                      value={city}
                                      onChange={(e) => {
                                        changeDeliveryCity(e.target.value);
                                      }}
                                    >
                                      {zones !== undefined &&
                                        Object.values(zones).length > 0 &&
                                        Object.values(zones).map((zone) => (
                                          <option
                                            key={zone.postal_code}
                                            value={zone.name}
                                          >
                                            {zone.name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="mad-col color-white">
                                  <label>
                                    Adresse de livraison
                                    <span>*</span>
                                  </label>
                                  <PlacesAutocomplete
                                    value={startAddress}
                                    onChange={handleStartAddressChange}
                                    onSelect={handleSelectStartAddress}
                                  >
                                    {({
                                      getInputProps,
                                      suggestions,
                                      getSuggestionItemProps,
                                      loading,
                                    }) => (
                                      <div>
                                        <input
                                          {...getInputProps({
                                            placeholder:
                                              "Tapez Voter Addresse ici ...",
                                          })}
                                        />
                                        <div className="autocomplete-dropdown ">
                                          <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion) => {
                                              const className =
                                                suggestion.active
                                                  ? "suggestion-item--active"
                                                  : "suggestion-item";

                                              const style = suggestion.active
                                                ? {
                                                  backgroundColor: "#fafafa",
                                                  cursor: "pointer",
                                                }
                                                : {
                                                  backgroundColor: "#ffffff",
                                                  cursor: "pointer",
                                                };
                                              return (
                                                <div
                                                  key={suggestion.index}
                                                  {...getSuggestionItemProps(
                                                    suggestion,
                                                    {
                                                      className,
                                                      style,
                                                    }
                                                  )}
                                                >
                                                  <span>
                                                    {suggestion.description}
                                                  </span>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </PlacesAutocomplete>
                                </div>
                              </Fragment>
                            )}

                            <div className="content-element-15 additional-information">
                              <h5>Informations complémentaires</h5>
                              <div className="mad-contact-form type-2 content-element-6">
                                <div className="mad-col color-white">
                                  <label>
                                    Ajouter des notes concernant votre commande
                                    ou votre adresse de livraison :
                                  </label>
                                  <textarea
                                    rows="9"
                                    onChange={handleFormChange("notes")}
                                  ></textarea>
                                </div>
                                <div className="mad-col"></div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {deliveryType !== "" && (
              <div className="payment-gateway">
                {!paypalOrderId && (
                  <h5 className="text-center">Mode de paiement</h5>
                )}
                {!orderReadyToSubmit && (
                  <p className="text-danger ">
                    Vous avez oublié de sélectionner ou de renseigner des champs
                    obligatoires
                  </p>
                )}
                {(tel.length > 10 || tel.length < 9) && (
                  <p className="text-danger ">
                    Le numéro de téléphone que vous avez saisi semble incorrect.
                    Merci de le modifier avant de valider votre commande.{" "}
                  </p>
                )}

                {parseFloat(totalPrice) < parseFloat(minOrder) && (
                  <p className="text-danger ">
                    Le minimum de commande en livraison à {city} est de{" "}
                    {parseFloat(minOrder).toFixed(2)}€
                  </p>
                )}
                {!paypalOrderId && (
                  <div className="row">
                    <div className="col-12">
                      <div
                        className={`${orderReadyToSubmit === false
                            ? " payment-button disabled"
                            : "payment-button"
                          }`}
                        onClick={(e) => {
                          validOrder(e, "paypal_v2");
                        }}
                      >
                        <a href="#">
                          <i class="fab fa-paypal"></i> Carte Bleue & Paypal
                        </a>
                      </div>
                      <div
                        className={` ${orderReadyToSubmit === false
                            ? " payment-button disabled"
                            : "payment-button"
                          }`}
                        onClick={(e) => {
                          validOrder(e, "cod");
                        }}
                      >
                        <a>
                          <i class="fas fa-money-bill-wave-alt"></i> Espèce
                        </a>
                      </div>
                      <div
                        className={` ${orderReadyToSubmit === false
                            ? " payment-button disabled"
                            : "payment-button"
                          }`}
                        onClick={(e) => {
                          validOrder(e, "pyr");
                        }}
                      >
                        <a href="#">
                          <i class="fas fa-money-check"></i> Chèque
                        </a>
                      </div>
                      {/* <div
                        className={` ${
                          orderReadyToSubmit === false
                            ? " payment-button disabled"
                            : "payment-button"
                        }`}
                        onClick={(e) => {
                          validOrder(e, "vog");
                        }}
                      >
                        <a href="#">
                          <i class="far fa-credit-card"></i> Carte Bancaire
                        </a>
                      </div> */}
                      <div
                        className={` ${orderReadyToSubmit === false
                            ? " payment-button disabled"
                            : "payment-button"
                          }`}
                        onClick={(e) => {
                          validOrder(e, "pyr");
                        }}
                      >
                        <a href="#">
                          <i class="fas fa-ticket-alt"></i> Ticket Restaurant
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {paypalOrderId && (
                  <div className="d-flex align-items-center justify-content-center">
                    {" "}
                    <img
                      style={{ width: "250px" }}
                      src="/images/paypal.png"
                      alt="csc"
                    />{" "}
                  </div>
                )}
                {paypalOrderId && (
                  <PaypalProvider
                    totalPrice={totalPrice}
                    orderReadyToSubmit={orderReadyToSubmit}
                    successCallBack={successCallBack}
                    paypalOrderId={paypalOrderId}
                  />
                )}
              </div>
            )}

            <div className="checkout-button">
              <div className="content-element-15"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center search-alert-box ">
        <div
          className="mt-5 mb-5 pt-5 pb-5"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <p className="search-alert-text">
            Panier Vide !! Remplissez votre panier, nous vous livrons le plus
            tôt possible !
          </p>
          <div className="d-flex search-alert-img justify-content-center align-items-center">
            <img
              src="images/page-not-found.svg"
              loading="lazy"
              alt="Page Not Found"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={`/thank-you?order_id=${orderId}`} />;
  }
};

export default CartSummary;
