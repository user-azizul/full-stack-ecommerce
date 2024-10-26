import React from "react";
import Banner from "../Component/Banner";
import Container from "../Component/Container";
import Sale from "../Component/Sale";
import ServicesTag from "../Component/ServicesTag";

function Home() {
  return (
    <div>
      <Banner />
      <ServicesTag />
      <Container className={"py-5 mg:py-10"}>
        <Sale />
      </Container>
    </div>
  );
}

export default Home;
