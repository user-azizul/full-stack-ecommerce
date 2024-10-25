import React from "react";
import { logo } from "../assets/images/index";
import Container from "./Container";
import SearchInput from "./SearchInput";
import { HiOutlineMenu } from "react-icons/hi";

import { FaUserAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { headerNavigation } from "../constants";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="border-b border-slate-300 bg-white sticky top-0 z-50">
      <Container className="py-7 flex items-center justify-between gap-x-3 md:gap-x-7">
        <Link to="/">
          {" "}
          <img className="w-20" src={logo} alt="" />
        </Link>

        <SearchInput />
        <div className=" hidden md:inline-flex items-center gap-x-5 md:gap-x-7 text-sm uppercase font-medium text-lightText">
          {headerNavigation?.map((item) => (
            <NavLink
              key={item?.title}
              to={item?.link}
              className=" hover:text-primary hoverEffect cursor-pointer relative group overflow-hidden"
            >
              {item?.title}
              <span className="absolute bottom-0 left-0 inline-block w-full h-px bg-primary -translate-x-[110%] group-hover:translate-x-0 hoverEffect" />
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="text-2xl relative hover:text-primary hoverEffect group"
          >
            <IoMdCart />
            <span className="absolute -right-2 -top-1 w-3.5 h-3.5 rounded-full text-[9px] bg-lightText hoverEffect group-hover:bg-primary text-white flex items-center justify-center">
              0
            </span>
          </Link>
          <Link
            to={"/login"}
            className="text-xl hover:text-primary hoverEffect"
          >
            <FaUserAlt />
          </Link>{" "}
        </div>
        <button className="text-2xl  text-lightText hover:text-primary hoverEffect md:hidden">
          <HiOutlineMenu />
        </button>
      </Container>
    </div>
  );
}

export default Header;
