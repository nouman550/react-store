import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = () => {
  const createOrder = (data, actions) => {
    return fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          "AX1joxTbYbKLECv5P9-C3VEjdhBDBEvEpajQ1qpWlgraEiogYwS4_t5J6lyro5LOIB42q_3Uaj7M_CJk:EKRO4ypZW1wiSqCk036Q5hQTahDsiyVpeNILgi3mNHhz87wGFjhoK7CcDW_JTijjkbwBEizbYVWzAOxY"
        )}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "0.01",
            },
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((order) => order.id);
  };

  const onApprove = (data, actions) => {
    return fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            "AX1joxTbYbKLECv5P9-C3VEjdhBDBEvEpajQ1qpWlgraEiogYwS4_t5J6lyro5LOIB42q_3Uaj7M_CJk:EKRO4ypZW1wiSqCk036Q5hQTahDsiyVpeNILgi3mNHhz87wGFjhoK7CcDW_JTijjkbwBEizbYVWzAOxY"
          )}`,
        },
      }
    )
      .then((res) => res.json())
      .then((details) => {
        alert(`Transaction completed by ${details.payer.name.given_name}`);
      });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AX1joxTbYbKLECv5P9-C3VEjdhBDBEvEpajQ1qpWlgraEiogYwS4_t5J6lyro5LOIB42q_3Uaj7M_CJk",
      }}
    >
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
