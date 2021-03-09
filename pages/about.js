import Head from "next/head";
import Layout from "../components/layout";

import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Container, Box, useColorModeValue as mode } from "@chakra-ui/react";

function About() {
  return (
    <>
      <Layout>
        <Head>
          <title>About</title>
        </Head>

        <Container maxW="container.lg">
          <Box>Test About</Box>
        </Container>
      </Layout>
    </>
  );
}

export default About;
