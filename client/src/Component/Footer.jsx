import React from "react";
import Container from "./Container";
import Title from "./Tittle";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import { paymentCard } from "../assets/images";

function Footer() {
  const shopArray = [
    { title: "Accessories", link: "/shop" },
    { title: "Clothes", link: "/shop" },
    { title: "Electronics", link: "/shop" },
    { title: "Home appliances", link: "/home-shop" },
    { title: "New Arrivals", link: "/new-shop" }
  ];
  const accountArray = [
    { title: "Profile", link: "/account" },
    { title: "Orders", link: "/orders" },
    { title: "Addresses", link: "/account" },
    { title: "Account Details", link: "/account" },
    { title: "Payment Options", link: "/account" }
  ];
  return (
    <div className=" w-fll bg-[#1b1b1b] py-20 text-white">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* first one  */}
        <div className="col-span-2">
          <div className="flex flex-col gap-6">
            <Title className={"text-xl"}> More about Forever Shop</Title>
            <p className="text-base w-full lg:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint
              ab ullam, numquam nesciunt in.
            </p>
            <SocialLinks />
          </div>
        </div>
        {/* seconds */}
        <div className={"flex flex-col gap-2"}>
          <Title className={"text-xl"}> Shop</Title>
          <ul className={"flex flex-col gap-2"}>
            {shopArray?.map((item, index) => (
              <Link
                className="text-lightText hover:text-white hover:underline underlins-[1px] decoration-gray-500 text-base underline-offset-2 cursor-pointer hoverEffect"
                to={item.link}
                key={index}
              >
                {item?.title}
              </Link>
            ))}
          </ul>
        </div>
        {/* third */}
        <div className={"flex flex-col gap-2"}>
          <Title className={"text-xl"}> Your Account</Title>
          <ul className={"flex flex-col gap-2"}>
            {accountArray?.map((item, index) => (
              <Link
                className="text-lightText hover:text-white hover:underline underlins-[1px] decoration-gray-500 text-base underline-offset-2 cursor-pointer hoverEffect"
                to={item.link}
                key={index}
              >
                {item?.title}
              </Link>
            ))}
          </ul>
        </div>
        {/* fourth */}
        <div className="col-span-2 w-full px-4 flex flex-col gap-6 items-center ">
          <Title className={"text-xl"}> Subscribe to our newsletter.</Title>
          <div className=" w-full ">
            <p className="text-base text-center ">
              A at pellentesque et mattis porta enim elementum.
            </p>
            <from className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter your email address"
                className=" w-full h-12 border-b text-white border-gray-400 bg-transparent px-4 text-lg placeholder:text-base outline-none"
              />
              <button
                className="px-6 py-2 bg-primary
              "
              >
                Subscribe
              </button>
            </from>
            <div className="mt-4  flex w-full  justify-center">
              <img
                className="object-contain w-[80%] lg-w-[70% ]"
                src={paymentCard}
                alt=""
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
