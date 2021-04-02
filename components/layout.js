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
  HStack,
  VStack,
  Grid,
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
          <Flex alignItems="center" color={mode("purple.800", "white")}>
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
                    <Icon glyph="compass" size={48} />
                  )}
                </a>
              </NextLink>
            </Box>
            <Box pl="10px">
              <Heading fontSize="1em" fontWeight="black" lineHeight="normal">
                <NextLink href="/">{SiteConfig.title}</NextLink>
              </Heading>
              <Text fontSize="1em" fontWeight="black" lineHeight="normal">
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
        pt="70px"
        pb="90px"
        borderColor={mode("gray.200", "gray.700")}
        bg={mode("gray.200", "gray.900")}
      >
        <Container maxW="container.lg">
          <Grid
            gap={10}
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "3fr 1fr max-content",
            }}
          >
            <Box>
              <HStack
                spacing={2}
                fontSize=".9em"
                lineHeight="normal"
                align="left"
                color={mode("purple.800", "white")}
              >
                <Box>
                  <Icon glyph="compass" size={34} />
                </Box>
                <Box>
                  <Text fontWeight="bold">{SiteConfig.title}</Text>
                  <Text fontWeight="bold">{SiteConfig.subtitle}</Text>
                </Box>
              </HStack>
            </Box>

            <Box>
              <Text fontWeight="bold" mb="15px">
                Region
              </Text>

              <VStack spacing={2} align="left">
                <Box>
                  <NextLink href="/?region=asia">
                    <a>Asia</a>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/?region=africa">
                    <a>Africa</a>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/?region=americas">
                    <a>Americas</a>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/?region=europe">
                    <a>Europe</a>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/?region=oceania">
                    <a>Oceania</a>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/?region=polar">
                    <a>Polar</a>
                  </NextLink>
                </Box>
              </VStack>
            </Box>
            {/* <Box>
              <Text fontWeight="bold">Some Country</Text>

              <VStack spacing={2} align="left">
                <Box>
                  <NextLink href="/country/tur">
                    <a>Turkey</a>
                  </NextLink>
                </Box>
              </VStack>
            </Box> */}
            <Box>
              <Text fontWeight="bold" mb="15px">
                About
              </Text>
              <Text>{SiteConfig.description}</Text>
            </Box>
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Layout;
