import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { ImUsers } from "react-icons/im";

function Sidebar() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 mt-2 pl-6">
        <NavLink
          to="/add"
          className="flex items-center justify-center md:justify-normal gap-3 border border-gray-300 border-r-0 px-3 py-2 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex border-gray-300 items-start justify-center rounded-full text-lg border p-1">
            {" "}
            <IoMdAdd />
          </span>
          <p>Add items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center justify-center md:justify-normal gap-3 border border-gray-300 border-r-0 px-3 py-2 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex border-gray-300 items-start justify-center rounded-full text-lg border p-1">
            {" "}
            <FaList />
          </span>
          <p>Product List</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center justify-center md:justify-normal gap-3 border border-gray-300 border-r-0 px-3 py-2 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex border-gray-300 items-start justify-center rounded-full text-lg border p-1">
            {" "}
            <AiFillProduct />
          </span>
          <p>Orders</p>
        </NavLink>
        <NavLink
          to="/users"
          className="flex items-center justify-center md:justify-normal gap-3 border border-gray-300 border-r-0 px-3 py-2 bg-gray-100 hover:bg-black/80 hover:text-white duration-300"
        >
          <span className="inline-flex border-gray-300 items-start justify-center rounded-full text-lg border p-1">
            {" "}
            <ImUsers />
          </span>
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
