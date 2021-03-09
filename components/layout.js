import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "supercons";
import {
  Button,
  Text,
  Box,
  Flex,
  Container,
  Spacer,
  Center,
  useColorModeValue as mode,
} from "@chakra-ui/react";

function Layout({ children }) {
  // const { colorMode, toggleColorMode } = useColorMode();
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
        pb="20px"
      >
        <Flex pt="20px">
          <Flex>
            <Box color="red.500">
              <Icon glyph="filter-fill" size={48} />
            </Box>
            <Box>
              <Text fontWeight="bold">{SiteConfig.title}</Text>
              <Text fontSize="sm">{SiteConfig.description}</Text>
            </Box>
          </Flex>
          <Spacer />
          <Box>
            <Link href="/">
              <a>Home</a>
            </Link>
            <span> | </span>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/help">
              <a>Help</a>
            </Link>
            <ColorModeSwitcher />
            {/* <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button> */}
          </Box>
        </Flex>
        {/* <Flex pt="30px">
          <Box>
            <ColorModeSwitcher />
          </Box>
          <Box>
            <Text fontWeight="bold">{SiteConfig.title}</Text>
            <Text fontSize="sm">{SiteConfig.description}</Text>
          </Box>
        </Flex> */}
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
      {/* <footer className={styles.footer}>footer</footer> */}
    </>
  );
}

export default Layout;
