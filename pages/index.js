import unfetch from "isomorphic-unfetch";
// import slug from 'slug'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import SearchInput from "../components/searchInput";
import SiteConfig from "../site.config";
import styles from "../styles/Home.module.css";
import { REGION } from "../constants";
import {
  Img,
  Flex,
  Button,
  Icon,
  Avatar,
  Stack,
  Spacer,
  ButtonGroup,
  Badge,
  Text,
  Container,
  Grid,
  Input,
  VStack,
  Box,
  LinkBox,
  LinkOverlay,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorMode,
} from "@chakra-ui/react";

function Home({ countries }) {
  const { colorMode, toggleColorMode } = useColorMode();

  function NumberFormat(amount) {
    return new Intl.NumberFormat("en-GB", {
      maximumSignificantDigits: 3,
    }).format(amount);
  }

  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
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
          {/* <Box>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </Box> */}
          <Flex mt="30px">
            <Box flex="1" position="relative">
              <Box w="14px" position="absolute" zIndex="1" top="13px" left="15px" color="gray.200" opacity=".5">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                  ></path>
                </svg>
              </Box>
              <Input
                paddingLeft="40px"
                borderWidth="2px"
                placeholder="Filter by Country Name"
                onChange={onInputChange}
              />
            </Box>
          </Flex>
          <Text as="small" color="gray">
            Found {filteredCountries.length} countries
          </Text>
          <ButtonGroup
            mt="30px"
            mb="30px"
            ml="20px"
            size="xs"
            variant="solid"
            spacing="2"
          >
            {REGION.map((item) => {
              // const showTitle = !flat && menu.title.length > 0
              // const selected = router.pathname === menu.path

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

          <Table variant="simple">
            <TableCaption>
              Showing {filteredCountries.length} countries
            </TableCaption>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Name</Th>
                <Th>Region</Th>
                <Th isNumeric>Population</Th>
                <Th isNumeric>
                  Area (km <sup>2</sup>)
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCountries.map((country) => (
                <Tr key={country.alpha3Code}>
                  <Td>
                    <Avatar
                      size="sm"
                      name={country.alpha2Code}
                      src={country.flag}
                    />
                  </Td>
                  <Td>
                    <Link
                      href="/country/[id]"
                      as={`/country/${country.alpha3Code}`}
                      key={country.name}
                    >
                      {country.name}
                    </Link>
                  </Td>
                  <Td>{country.region}</Td>
                  <Td isNumeric>{NumberFormat(country.population)}</Td>
                  <Td isNumeric>{NumberFormat(country.area)} </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await unfetch("https://restcountries.eu/rest/v2/all/");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
export default Home;
