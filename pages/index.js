import React, { useState, useEffect } from "react";

import Head from "next/head";
import Layout from "../components/layout";
import SearchInput from "../components/searchInput";
import SiteConfig from "../site.config";
import styles from "../styles/Home.module.css";
import {
  Img,
  Button,
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
    console.log("Get Europe");
    setKeyword("asia");
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{SiteConfig.title}</title>
        </Head>
        <Container maxW="container.lg">
          <button onClick={getRegion}>Get Europe</button>
          <p>Found {countries.length} countries</p>

          <Input placeholder="Filter by Name" onChange={onInputChange} />

          {/* <SearchInput placeholder="Filter by Name" onChange={onInputChange} /> */}

          {filteredCountries.map((country) => (
            <LinkBox
              key={country.alpha3Code}
              as="article"
              m="5"
              p="5"
              rounded="md"
              boxShadow="base"
            >
              <Grid templateColumns="repeat(4, 1fr)" gap={0}>
                <Box>
                  <LinkOverlay href="#">
                    <Img src={country.flag} width="60px" height="40px" />
                  </LinkOverlay>
                </Box>
                <Box>{country.name}</Box>
                <Box>
                  {country.population}
                  {/* <Button colorScheme="gray">Click me</Button> */}
                </Box>
                <Box>{country.area}</Box>
              </Grid>
            </LinkBox>
          ))}

          {/* <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Region</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCountries.map((country) => (
                <Tr key={country.alpha3Code}>
                  <Td>{country.name}</Td>
                  <Td>{country.region}</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
              ))}
            </Tbody>
          </Table> */}

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
