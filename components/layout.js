import Head from "next/head";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Badge, Text, Box, Flex, Container } from "@chakra-ui/react";
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Fatih Eğriboz - Global Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxW="container.lg">
        <Flex pt="30px">
          <Box>
            <ColorModeSwitcher />
          </Box>
          <Box>
            <Text fontWeight="bold">{SiteConfig.title}</Text>
            <Text fontSize="sm">{SiteConfig.description}</Text>
          </Box>
        </Flex>
        {/* <p>
          {SiteConfig.title} - {SiteConfig.description}
        </p> */}
      </Container>
      <main>{children}</main>
      <footer className={styles.footer}>footer</footer>
    </>
  );
}

export default Layout;
