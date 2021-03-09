import Head from "next/head";
import Layout from "../components/layout";

import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Container, Box, useColorModeValue as mode } from "@chakra-ui/react";

function Help() {
  return (
    <>
      <Layout>
        <Head>
          <title>Help</title>
        </Head>

        <Container maxW="container.lg">
          <Box>Test Help</Box>
        </Container>
      </Layout>
    </>
  );
}

export default Help;
