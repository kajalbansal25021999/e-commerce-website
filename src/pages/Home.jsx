import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ setCartCount }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);
  const [loading, setLoading] = useState(!user);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    if (!user) {
      axios
        .get("/api/user", { withCredentials: true })
        .then((response) => {
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            navigate("/login");
          }
        })
        .catch(() => navigate("/login"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/api/cart", { withCredentials: true })
      .then((response) => {
        const itemsMap = response.data.items.reduce((acc, item) => {
          acc[item.productId] = item.quantity;
          return acc;
        }, {});
        setCartItems(itemsMap);
        setCartCount(Object.keys(itemsMap).length); // Set cart count here
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [setCartCount]);

  const addToCart = (product) => {
    axios
      .post(
        "/api/cart",
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setCartItems((prev) => ({
          ...prev,
          [product.id]: 1,
        }));
        setCartCount((prevCount) => prevCount + 1); // Increment cart count
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-5xl font-bold text-center">
          Welcome {user && user.name} !!!
        </h1>
        <div className="text-black text-lg">
          Cart: {Object.keys(cartItems).length}{" "}
          {Object.keys(cartItems).length === 1 ? "item" : "items"}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow flex flex-col h-full"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
            <button
              className={`${
                cartItems[product.id]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 mt-auto w-full rounded`}
              onClick={() => addToCart(product)}
              disabled={cartItems[product.id]}
            >
              {cartItems[product.id] ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
