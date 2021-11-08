import React from "react";
import Head from "next/head";

import Layout from "../components/layout";
import { Container, Text } from "@chakra-ui/layout";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const test = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>Test</title>
        </Head>
        <Container>
          <Text>Test</Text>
          <Carousel responsive={responsive}>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
            <div>Item 6</div>
            <div>Item 7</div>
          </Carousel>
        </Container>
      </Layout>
    </>
  );
};

export default test;
