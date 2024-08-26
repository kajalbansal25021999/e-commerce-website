import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/cart", { withCredentials: true })
      .then((response) => {
        setCart(response.data.items || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    navigate("/placeOrder", { state: { data: cart } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => {
          return (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-lg font-semibold">
                  Quantity: {item.quantity}
                </p>
                <p className="text-lg font-semibold">Price: ${item.price}</p>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />
            </div>
          );
        })}
      </div>
      <button
        className="mr-5 mt-5 text-lg font-bold py-1 px-6 bg-red-500 text-white"
        onClick={handlePlaceOrder}
      >
        Place order
      </button>
    </div>
  );
};

export default Cart;
