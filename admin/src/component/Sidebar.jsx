import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { ImUsers } from "react-icons/im";

function Sidebar() {
  return (
    <div className="w-full  h-full  bg-white shadow-md">
      <div className="flex flex-col gap-4 mt-2 pl-2">
        <NavLink
          to="/add"
          className="flex items-center gap-3 border justify-center md:justify-normal border-gray-300 border-r-0 px-2 py-2 md:px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex items-center justify-center rounded-full text-lg border border-gray-300 p-1 md:p-2">
            <IoMdAdd />
          </span>
          <p className="text-sm md:text-base hidden sm:inline">Add items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 md:px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex items-center justify-center rounded-full text-lg border border-gray-300 p-1 md:p-2">
            <FaList />
          </span>
          <p className="text-sm md:text-base hidden sm:inline">Product List</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 md:px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex items-center justify-center rounded-full text-lg border border-gray-300 p-1 md:p-2">
            <AiFillProduct />
          </span>
          <p className="text-sm md:text-base hidden sm:inline">Orders</p>
        </NavLink>
        <NavLink
          to="/users"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-2 py-2 md:px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex items-center justify-center rounded-full text-lg border border-gray-300 p-1 md:p-2">
            <ImUsers />
          </span>
          <p className="text-sm md:text-base hidden sm:inline">Users</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
