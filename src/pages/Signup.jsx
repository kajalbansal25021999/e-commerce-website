import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("/api/signup", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email.");
        } else {
          console.log(err);
        }
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="name">
              Enter Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?
          <a href="/login" className="text-blue-500 ml-1 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
