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
  Avatar,
  Stack,
  Spacer,
  Button,
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
} from "@chakra-ui/react";

function Home({ countries }) {
  // const numberFormat = (value) =>
  //   new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //   }).format(value);
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
          <Flex mt="30px">
            <Box flex="1">
              <Input
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
                      href={`/country/${country.alpha3Code}`}
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

          {/* <ul className="thlist">
            {filteredCountries.map((country) => (
              <li key={country.alpha3Code}>{country.name}</li>
            ))}
          </ul> */}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
export default Home;
