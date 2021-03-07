import Head from "next/head";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  Badge,
  Text,
  Box,
  Flex,
  Container,
  Spacer,
  Center,
} from "@chakra-ui/react";
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{SiteConfig.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container as="header" maxW="container.lg">
        <Flex pt="20px">
          <Flex>
            <Box>
              <ColorModeSwitcher />
            </Box>
            <Box>
              <Text fontWeight="bold">{SiteConfig.title}</Text>
              <Text fontSize="sm">{SiteConfig.description}</Text>
            </Box>
          </Flex>
          <Spacer />
          <Box>Info</Box>
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
      <Container as="footer" maxW="100%" pt="30px" pb="30px">
        <Container maxW="container.lg">
          <Center>footer</Center>
        </Container>
      </Container>
      {/* <footer className={styles.footer}>footer</footer> */}
    </>
  );
}

export default Layout;
