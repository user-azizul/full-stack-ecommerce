import React from "react";
import { Link } from "react-router-dom";
import { saleImgOne, saleImgThree, saleImgTwo } from "../assets/images";

function Sale() {
  return (
    <div className=" w-full h-auto md:h-[550px] flex flex-col md:flex-row items-center justify-between gap-10 py-1">
      <div className="w-full md:w-1/2 h-[250px] md:h-full border border-gray-300 rounded-md overflow-hidden relative group">
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500 ease-in-out"
          src={saleImgOne}
          alt=""
        />
        <div className="absolute w-full h-full top-0 left-0 bg-black/40 text-white/80 flex items-center justify-center ">
          <div className=" flex flex-col items-center gap-2">
            <p className="text-sm md:text-lg font-medium text-white">
              {" "}
              10% sales ongoing phone
            </p>

            <p className="text-sm md:text-lg font-medium text-white">
              {" "}
              Offer on limited tiem
            </p>
            <Link
              className="bg-white/70 text-black inline-flex items-center justify-center w-36 h-10 rounded-md hover:bg-white duration-300 font-medium hoverEffect"
              to={"/shop"}
            >
              {" "}
              Shop now
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="w-full md:h-full md:w-1/2 h-auto flex flex-col justify-between gap-10 md:gap-0">
        <div className="w-full h-[250px] md:h-[46%] border border-gray-300 rounded-md overflow-hidden relative group">
          <img
            className="w-ful h-full object-cover group-hover:scale-110 duration-500 ease-in-out"
            src={saleImgTwo}
            alt=""
          />
          <div className="absolute w-full h-full top-0 left-0 bg-black/40 text-white/80 flex items-center  ">
            <div className=" flex flex-col p-10 gap-2">
              <p className="text-sm md:text-lg font-medium text-white">
                {" "}
                10% sales ongoing phone
              </p>

              <p className="text-sm md:text-lg font-medium text-white">
                {" "}
                Offer on limited tiem
              </p>
              <Link
                className="bg-white/70 inline-flex text-black justify-center items-center w-36 h-10 rounded-md hover:bg-white duration-300 font-medium hoverEffect"
                to={"/shop"}
              >
                {" "}
                Shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-[250px] md:h-[46%] border border-gray-300 rounded-md overflow-hidden relative group">
          <img
            className="w-ful h-full object-cover group-hover:scale-110 duration-500 ease-in-out"
            src={saleImgThree}
            alt=""
          />
          <div className="absolute w-full h-full top-0 left-0 bg-black/40 text-white/80 flex items-center  ">
            <div className=" flex flex-col p-10 gap-2">
              <p className="text-sm md:text-lg font-medium text-white">
                {" "}
                10% sales ongoing phone
              </p>

              <p className="text-sm md:text-lg font-medium text-white">
                {" "}
                Offer on limited tiem
              </p>
              <Link
                className="bg-white/70 inline-flex text-black justify-center items-center w-36 h-10 rounded-md hover:bg-white duration-300 font-medium hoverEffect"
                to={"/shop"}
              >
                {" "}
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
