import React from "react";
import { logo } from "../assets/images/index";
import Container from "./Container";
import SearchInput from "./SearchInput";

function Header() {
  return (
    <div className="border-b border-slate-300">
      <Container className="py-7 flex items-center justify-between gap-x-3 md:gap-x-7">
        <img className="w-20" src={logo} alt="" />
        <SearchInput />
        <div className=" hidden md:inline-flex items-center gap-x-5 md:gap-x-7 text-sm uppercase font-medium text-lightText">
          <p>navlinks</p>
          <p>user</p>
          <p>cart</p>
        </div>
      </Container>
    </div>
  );
}

export default Header;
