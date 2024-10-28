import React from "react";
import Container from "./Container";
import { logo } from "../assets/images/index";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-b-gray-600 w-full sticky top-0 left-0 z-50 bg-white">
      <Container className="py-6 flex items-center justify-between">
        <Link>
          <img className="w-24" src={logo} alt="" />
          <p className="text-xs uppercase font-bold mt-1 tracking-wide text-blue-600">
            Admin Panel
          </p>
        </Link>
        <button className="bg-black/80 text-white px-6 py-2 hover:bg-black  duration-300 ease-in-out   rounded-full">
          Logout
        </button>
      </Container>
    </header>
  );
}

export default Navbar;
