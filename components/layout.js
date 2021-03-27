import Head from "next/head";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import SiteConfig from "../site.config";
import lowerCaseText from "../functions/lowerCaseText";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import Icon from "supercons";
import {
  Heading,
  Avatar,
  Text,
  Box,
  Flex,
  Container,
  Spacer,
  Center,
} from "@chakra-ui/react";

function Layout({ children }) {
  const router = useRouter();
  const ID = router.query.id;

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
        borderColor={mode("gray.200", "gray.700")}
      >
        <Flex pt="10px" pb="10px">
          <Flex alignItems="center">
            <Box>
              <NextLink href="/">
                <a>
                  {ID ? (
                    <Avatar
                      p="2"
                      w="48px"
                      h="48px"
                      filter="invert(0)"
                      backgroundColor="transparent"
                      borderWidth="1px"
                      borderColor={mode("gray.300", "gray.700")}
                      name={ID}
                      src={`https://restcountries.eu/data/${lowerCaseText(
                        ID
                      )}.svg`}
                    />
                  ) : (
                    <Icon glyph="filter-fill" size={48} />
                  )}
                </a>
              </NextLink>
            </Box>
            <Box pl="10px">
              <Heading fontSize="1em" fontWeight="bold" lineHeight="normal">
                <NextLink href="/">{SiteConfig.title}</NextLink>
              </Heading>
              <Text fontSize="1em" fontWeight="bold" lineHeight="normal">
                <NextLink href="/">{SiteConfig.subtitle}</NextLink>
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Box>
            <ColorModeSwitcher />
          </Box>
        </Flex>
      </Container>

      <main>{children}</main>
      <Container
        as="footer"
        maxW="100%"
        borderTopWidth="1px"
        mt="45px"
        pt="130px"
        pb="130px"
        borderColor={mode("gray.200", "gray.700")}
        bg={mode("gray.200", "gray.900")}
      >
        <Container maxW="container.lg">
          <Center>
            <Box>
              <ul>
                <li>
                  <a href="/?region=asia">asia</a>
                </li>
                <li>
                  <a href="/?region=oceania">oceania</a>
                </li>
                <li>
                  <a href="/?region=africa">africa</a>
                </li>
                <li>
                  <a href="/?region=polar">polar</a>
                </li>
              </ul>
            </Box>
            <Box>
              NextLink
              <ul>
                <li>
                  <NextLink href="/?region=asia">
                    <a>asia</a>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/?region=oceania">
                    <a>oceania</a>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/?region=africa">
                    <a>africa</a>
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/?region=polar">
                    <a>polar</a>
                  </NextLink>
                </li>
              </ul>
            </Box>
          </Center>
        </Container>
      </Container>
    </>
  );
}

export default Layout;
