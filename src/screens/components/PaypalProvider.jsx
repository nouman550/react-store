import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaypalProvider = ({
  totalPrice,
  orderReadyToSubmit,
  successCallBack,
  paypalMessageErrorCallBack,
  paypalOrderId,
}) => {
  let navigate = useNavigate();

  // creates a paypal order
  const createOrder = (data, actions) => {
    if (paypalOrderId) {
      return fetch("https://api-m.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${process.env.REACT_APP_PAYPAL_CLIENT_ID}:${process.env.REACT_APP_PAYPAL_SECREt_ID}`
          )}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "Sushi Street",
              amount: {
                currency_code: "EUR",
                value: parseFloat(totalPrice).toFixed(2),
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        }),
      })
        .then((response) => response.json())
        .then((order) => {
          return order.id;
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          toast.warn("There was an error with your order");
        });
    } else {
      return;
    }
  };

  // check Approval
  const onApprove = (data, actions) => {
    return fetch(
      `https://api-m.paypal.com/v2/checkout/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${process.env.REACT_APP_PAYPAL_CLIENT_ID}:${process.env.REACT_APP_PAYPAL_SECREt_ID}`
          )}`,
        },
      }
    )
      .then((response) => response.json())
      .then((details) => {
        const { payer, id } = details;
        successCallBack(true);
        navigate(
          `/validate-pay-pal-payment?paypal_id=${id}&order_id=${paypalOrderId}`
        );
      })
      .catch((error) => {
        console.error("Error capturing order:", error);
        navigate(
          `/validate-pay-pal-payment?paypal_id=${data.orderID}&order_id=${paypalOrderId}`
        );
      });
  };

  // capture likely error
  const onError = (data, actions) => {
    paypalMessageErrorCallBack("An Error occured with your payment ");
  };

  // paypal checkout end
  return (
    <PayPalScriptProvider
      options={{
        "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
        locale: "fr_FR",
        currency: "EUR",
        // locale: "fr_FR",
      }}
    >
      <div className="form-control payment-option">
        {orderReadyToSubmit === true ? (
          <>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              fundingSource="paypal"
            />
            <br />
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              fundingSource="card"
            />
          </>
        ) : (
          <>
            <PayPalButtons
              disabled
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              fundingSource="paypal"
            />
            <br />
            <PayPalButtons
              disabled
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              fundingSource="card"
            />
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalProvider;
