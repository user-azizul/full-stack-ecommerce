import React from "react";
import Container from "./Container";
import { services } from "../constants/constant";

function ServicesTag() {
  return (
    <div className="bg-[#f4f4f4]">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center md:place-items-start">
        {services?.map((service, index) => (
          <div key={index} className=" flex items-center gap-2">
            <span className="text-5xl text-blue-700">{service?.icon}</span>
            <div>
              <h3 className="text-base uppercase font-bold">
                {service?.title}
              </h3>
              <p className="text-sm font-medium max-w-[160px] tracking-wide">
                {service.subtitle}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default ServicesTag;
