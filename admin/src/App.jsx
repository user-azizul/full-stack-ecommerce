import React from "react";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

function App() {
  return (
    <main className="w-full bggray50 min-h-screen">
      <Navbar />
      <div>
        <div className="w-[18%] fixed min-h-screen border-r-2">
          <Sidebar />
        </div>
        <div className="flex-1  px-5 py2 ml-[18%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
