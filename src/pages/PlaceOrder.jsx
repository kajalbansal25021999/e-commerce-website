import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const location = useLocation();
  const [data, setData] = useState(location?.state?.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(0);

  const getTotalPrice = () => {
    let totalP = 0;
    let totalQty = 0;
    if (data && data.length) {
      data.map((item, index) => {
        totalP += item.price;
        totalQty += item.quantity;
      });
    }
    console.log(totalP, totalQty);
    setTotalPrice(totalP);
    setQty(totalQty);
  };

  useEffect(() => {
    getTotalPrice();
  }, []);

  return (
    <div className="container mx-auto p-4">
      PlaceOrder
      <h1>total price: {totalPrice}</h1>
      <h1>total qty: {qty}</h1>
    </div>
  );
};

export default PlaceOrder;
