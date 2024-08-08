import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { useSearchParams } from "react-router-dom";
import ConfirmOrder from "./components/ConfirmOrder";
import { Navigate } from "react-router-dom";

const ThankYou = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    setOrderId(searchParams.get("order_id"));
  }, []);

  if (!orderId && orderId !== 0) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="mt-4 mb-4" style={{ paddingTop: "135px" }}>
        {orderId !== 0 && <ConfirmOrder orderId={orderId} />}
      </div>
    </div>
  );
};

export default ThankYou;
