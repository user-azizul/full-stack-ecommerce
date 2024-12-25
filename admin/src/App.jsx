import React from "react";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Login from "./component/Login";
import { userGlobalContext } from "./context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { token } = userGlobalContext();

  return (
    <main className="w-full min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      {!token ? (
        <Login />
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[18%] fixed md:static min-h-screen border-r-2 bg-white">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 px-4 md:px-5 py-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      )}
      <ToastContainer />
    </main>
  );
}

export default App;
