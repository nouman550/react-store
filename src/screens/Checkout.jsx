import React, { useEffect } from "react";
import Header from "./components/Header";
import CartSummary from "./components/CartSummary";
import ImportScript from "./components/ImportScript";
import { Helmet } from "react-helmet";
import "./styles.css";

const Checkout = () => {
  ImportScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtYhn4qMr35Dz1EjdzJymTT2U-eyWvktw&libraries=places"
  );

  useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Validez votre commande</title>
        <meta
          name="description"
          content="Choisissez votre type de commande et votre modalité de paiement. Votre commande vous sera livrée au moment convenu et le gout que vous attendez."
        />
      </Helmet>
      <CartSummary />
    </div>
  );
};

export default Checkout;
