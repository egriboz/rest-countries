import Head from "next/head";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "supercons";
import {
  Heading,
  Text,
  Box,
  Flex,
  Container,
  Spacer,
  Center,
  useColorModeValue as mode,
} from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{SiteConfig.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container
        as="header"
        maxW="100%"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderColor={mode("gray.200", "gray.700")}
      >
        <Flex pt="10px" pb="10px">
          <Flex alignItems="center">
            <Box>
              <NextLink href="/">
                <a>
                  <Icon glyph="filter-fill" size={48} />
                </a>
              </NextLink>
            </Box>
            <Box pl="10px">
              <Heading
                as="h1"
                fontSize="1.2em"
                fontWeight="bold"
                lineHeight="normal"
              >
                {SiteConfig.title}
              </Heading>
              <Text fontSize=".7em" lineHeight="normal">
                {SiteConfig.description}
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Box>
            {/* <NextLink href="/">
              <a>Home</a>
            </NextLink>
            <span> | </span>
            <NextLink href="/about">
              <a>About</a>
            </NextLink> */}
            <ColorModeSwitcher />
            {/* <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button> */}
          </Box>
        </Flex>
      </Container>

      <main>{children}</main>
      <Container
        as="footer"
        maxW="100%"
        borderTopWidth="1px"
        borderColor="gray.100"
        mt="45px"
        pt="30px"
        pb="30px"
      >
        <Container maxW="container.lg">
          <Center>footer</Center>
        </Container>
      </Container>
    </>
  );
}

export default Layout;
