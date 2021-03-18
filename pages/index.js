import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import Head from "next/head";
import Layout from "../components/layout";
// import SearchInput from "../components/searchInput";
// import slug from 'slug'
import SiteConfig from "../site.config";
// import styles from "../styles/Home.module.css";
import fetch from "isomorphic-unfetch";

import { REGION } from "../constants";
import numberFormat from "../functions/numberFormat";
// import useWindowSize from "../hooks/useWindowSize"

import {
  Flex,
  Button,
  ButtonGroup,
  Text,
  Container,
  Input,
  Box,
  Grid,
  Center,
  Heading,
  Spacer,
  useColorModeValue as mode,
  useMediaQuery,
} from "@chakra-ui/react";

function Home({ countries }) {
  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const bg = mode("white", "gray.700");
  const bgHover = mode("white", "#282e3c");

  const [keyword, setKeyword] = useState("");

  // const { width } = useWindowSize()
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.nativeName.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  function getRegion(e) {
    e.preventDefault();
    let dataRegion = e.target.getAttribute("data-region");
    console.log(dataRegion);
    setKeyword(dataRegion);
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{SiteConfig.title}</title>
        </Head>

        <Container maxW="container.lg">
          <Flex
            mt={{
              base: "50px",
              sm: "70px",
            }}
            mb="30px"
          >
            <Box flex="1" position="relative">
              <Box
                w="20px"
                position="absolute"
                zIndex="2"
                top="22px"
                left="24px"
                color="gray.500"
                opacity=".5"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                  ></path>
                </svg>
              </Box>

              <Input
                textTransform="capitalize"
                size="lg"
                pt="30px"
                pb="30px"
                fontSize={{
                  base: "initial",
                  sm: "md",
                }}
                fontWeight="medium"
                rounded="full"
                paddingLeft="60px"
                placeholder="Search by Country Name or Region"
                bg={mode("white", "gray.700")}
                color="brand"
                onChange={onInputChange}
              />
            </Box>
          </Flex>
          <Flex pl="20px" pr="20px" mb="30px">
            {!isLargerThanMD && (
              <>
                <Text color="gray.500">Filter by Region</Text>
                <ButtonGroup
                  mb="30px"
                  ml="20px"
                  size="xs"
                  variant="solid"
                  spacing="2"
                >
                  {REGION.map((item) => {
                    return (
                      <Button
                        // color={item.color}
                        // color={mode(`${item.color}`, "gray.700")}
                        //bg={item.background}
                        key={item.region}
                        data-region={item.region}
                        onClick={getRegion}
                        colorScheme={item.colorscheme}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
                </ButtonGroup>

                <Spacer />
              </>
            )}
            <Box
              alignSelf="stretch"
              textAlign={{
                base: "center",
                sm: "left",
              }}
            >
              <Text color="gray.500">
                Found {filteredCountries.length} countries
              </Text>
            </Box>
          </Flex>

          {filteredCountries.map((country) => (
            <Box as="div" pos="relative" maxW="100%" key={country.alpha3Code}>
              <Grid
                templateColumns={{
                  base: "35px 1fr",
                  md: "min-content 2fr 1fr 1fr 1fr",
                }}
                gap={5}
                bg={bg}
                shadow="xs"
                rounded="sm"
                p={{
                  base: "25px",
                  md: "50px",
                }}
                mb="15px"
                style={{ transition: "all .3s" }}
                _hover={{
                  bg: bgHover,
                  //transform: "scale(1.008)",
                  shadow: "lg",
                }}
              >
                <Box
                  w="60px"
                  display="flex"
                  alignItems="center"
                  overflow="hidden"
                  borderRadius="2px"
                >
                  <NextImage
                    width={45}
                    height={30}
                    // objectFit="cover"

                    shadow="xs"
                    overflow="hidden"
                    alt={country.name}
                    src={country.flag}
                  />
                </Box>

                <Box display="flex" alignItems="center" fontWeight="semibold">
                  <NextLink
                    href="/country/[id]"
                    as={`/country/${country.alpha3Code}`}
                  >
                    <a className="overlayLink">{country.name}</a>
                  </NextLink>
                </Box>
                {!isLargerThanMD && (
                  <>
                    <Box>
                      <Text color="gray.400" fontSize="xs">
                        REGION
                      </Text>
                      {country.region}
                    </Box>

                    <Box>
                      <Text color="gray.400" fontSize="xs">
                        POPULATION
                      </Text>
                      {numberFormat(country.population)}
                    </Box>
                    <Box>
                      <Text color="gray.400" fontSize="xs">
                        AREA km<sup>2</sup>
                      </Text>
                      {numberFormat(country.area)}
                    </Box>
                  </>
                )}
              </Grid>
            </Box>
          ))}
          <Box>
            <Center as="small" mt="30px" color="gray.500">
              Found {filteredCountries.length} countries
            </Center>
          </Box>
          <style jsx global>{`
            a.overlayLink {
              margin: 4px;
            }
            a.overlayLink::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
          `}</style>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all/");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
export default Home;
