import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);
  const [loading, setLoading] = useState(!user);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <h1 className="text-white text-5xl font-bold">
        Welcome {user && user.name} !!!
      </h1>
    </div>
  );
};

export default Home;
