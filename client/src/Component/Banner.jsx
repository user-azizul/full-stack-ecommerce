import React, { useState } from "react";
import Slider from "react-slick";
import { bannerData } from "../constants/constant";
import Container from "./Container";
import Title from "./Tittle";

function Banner() {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <ul
          style={{
            margin: "0px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "50px",
                height: "15px",
                backgroundColor: "#262626",
                borderRadius: "20px",
                cursor: "pointer"
              }
            : {
                width: "15px",
                height: "15px",
                backgroundColor: "#fff",
                borderRadius: "50px",
                cursor: "pointer"
              }
        }
      ></div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              <ul
                style={{
                  margin: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "50px",
                      height: "15px",
                      backgroundColor: "#262626",
                      borderRadius: "20px",
                      cursor: "pointer"
                    }
                  : {
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#fff",
                      borderRadius: "50px",
                      cursor: "pointer"
                    }
              }
            ></div>
          )
        }
      }
    ]
  };

  return (
    <div className="w-full max-h-[500px]">
      <Slider {...settings}>
        {bannerData?.map((banner, index) => (
          <div key={index} className="relative">
            <img
              className="h-full lg:h-[500px] w-full object-cover"
              src={banner?.image}
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/25">
              <Container className="flex flex-col justify-center gap-2 md:gap-3 h-full">
                <p className="w-28 py-1 bg-red-600 text-white text-xs uppercase text-center font-medium tracking-wide rounded-md">
                  {banner?.sale}
                </p>
                <Title className="md:text-5xl max-w-sm md:max-w-xl font-bold md:leading-[55px] capitalize">
                  {banner?.title}
                </Title>
                <p className="text-xs md:text-base uppercase font-medium">
                  {banner?.discount}
                </p>
                <p>
                  From{" "}
                  <span className="md:text-xl font-bold text-blue-700 md:ml-2">
                    {banner?.from}
                  </span>
                </p>
                <button className="w-24 md:w-44 py-2 md:py-0 md:h-12 bg-black/80  text-white rounded-md text-xs md:text-sm uppercase hover:bg-black font-semibold hoverEffect">
                  Shop now
                </button>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
