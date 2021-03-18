import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import NeighborsCountries from "../components/NeighborsCountries";
// import SearchInput from "../components/searchInput";
import SiteConfig from "../site.config";
import fetch from "isomorphic-unfetch";
import { REGION } from "../constants";
import Search from "../components/Search";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Container,
  Flex,
  Box,
  Center,
  Button,
  ButtonGroup,
  Text,
  Input,
  Spacer,
} from "@chakra-ui/react";

function Home({ countries }) {
  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const [keyword, setKeyword] = useState("");
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
          <Search onChange={onInputChange} />
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
          {filteredCountries &&
            filteredCountries.map((country) => (
              <NeighborsCountries key={country.alpha3Code} data={country} />
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
