import React, { useState } from "react";
import { logo } from "../assets/images/index";
import Container from "./Container";
import SearchInput from "./SearchInput";
import { HiOutlineMenu } from "react-icons/hi";

import { FaUserAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { headerNavigation } from "../constants/constant";
import { Link, NavLink } from "react-router-dom";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Title from "./Tittle";
import { IoCloseOutline } from "react-icons/io5";
import SocialLinks from "./SocialLinks";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-300 bg-white sticky top-0 z-40">
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
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl  text-lightText hover:text-primary hoverEffect md:hidden"
        >
          <HiOutlineMenu />
        </button>
        {/* mobile menu  */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 w-screen text-white/80 "
        >
          <div className="fixed inset-0 z-50 bg-black/90 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-[90%] space-y-4 bg-primary border p-6 border-lightText rounded-md absolute top-10 ">
              <div className="flex items-center justify-between gap-5">
                <Title className={"text-xl text-white"}>Menu</Title>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 text-2xl hover:text-red-600 duration-300 border border-white/20 rounded-sm hover:border-white/40"
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className="flex flex-col gap-5 pt-5">
                {headerNavigation?.map((item, index) => (
                  <NavLink
                    className={
                      "hover:text-white hoverEffect  duration-300 relative group flex items-center  gap-2"
                    }
                    key={index}
                  >
                    <span className="w-2.5 h-2.5 hoverEffect rounded-full border border-white/30 inline-flex group-hover:border-white duration-300"></span>
                    {item?.title}
                    <span
                      className="absolute border-b border-white/30
                     bottom-[-2px] left-0 w-full group-hover:border-white duration-300 hoverEffect h-px"
                    ></span>
                  </NavLink>
                ))}
              </div>
              <div className="mt-5 pt-2">
                <SocialLinks />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Container>
    </div>
  );
}

export default Header;
