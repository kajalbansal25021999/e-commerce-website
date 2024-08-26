import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import NavBar from "./components/Navbar";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cartCount={cartCount}
      />
      <Routes>
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Home setCartCount={setCartCount} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
