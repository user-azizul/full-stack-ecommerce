import React, { useState } from "react";
import { userGlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { successNotification } from "./../util/showNotification";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, backendUrl } = userGlobalContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/user/admin", {
        email,
        password,
      });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
        successNotification("Logged in successfully");
        setTimeout(() => {
          //   navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      errorNotification(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-md">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
