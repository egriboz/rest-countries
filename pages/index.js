import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import SearchInput from "../components/searchInput";
// import slug from 'slug'
import SiteConfig from "../site.config";
import styles from "../styles/Home.module.css";

import { REGION } from "../constants";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import {
  Flex,
  Button,
  Image,
  ButtonGroup,
  Text,
  Container,
  Input,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  SimpleGrid,
  StatNumber,
  useColorModeValue as mode,
} from "@chakra-ui/react";

function Home({ countries }) {
  const { colorMode, toggleColorMode } = useColorMode();
  // const { colorMode } = useColorMode();
  // const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("orange", "blue");
  const color = useColorModeValue("white", "gray.800");
  // number format
  const numberFormat = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      maximumSignificantDigits: 3,
    }).format(amount);
  };

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
        {/* bg={bg} color={color} */}
        {/* <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button> */}
        {/* <Container bg={bg} color={color}>
            This box's style will change based on the color mode.
          </Container> */}
        {/* <Button size="sm" onClick={toggleColorMode}>
            Toggle Mode
          </Button> */}

        <Container maxW="container.lg">
          <Flex mt="45px" mb="45px">
            <Box flex="1" position="relative">
              <Box
                w="14px"
                position="absolute"
                zIndex="1"
                top="17px"
                left="15px"
                color="gray.200"
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
                placeholder="large size"
                size="lg"
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

          {filteredCountries.map((country) => (
            // <Grid
            //   key={country.alpha3Code}
            //   h="100px"
            //   templateRows="30px 100px"
            //   templateColumns="repeat(5, 1fr)"
            //   gap={4}
            //   mb="15px"
            //   bg={mode("white", "gray.700")}
            //   shadow="base"
            //   rounded="lg"
            // >
            //   <GridItem rowSpan={2} colSpan={1}>
            //     <Image
            //       w="40px"
            //       borderRadius="4px"
            //       name={country.alpha2Code}
            //       src={country.flag}
            //     />
            //   </GridItem>
            //   <GridItem colSpan={4}>
            //     <Link
            //       href="/country/[id]"
            //       as={`/country/${country.alpha3Code}`}
            //       key={country.name}
            //     >
            //       <Text fontWeight="bold">{country.name}</Text>
            //     </Link>
            //   </GridItem>
            //   <GridItem colSpan={4}>sd</GridItem>
            // </Grid>

            <Grid
              key={country.alpha3Code}
              templateColumns="min-content 2fr 1fr 1fr 1fr"
              gap={5}
              // as="section"
              bg={mode("white", "gray.700")}
              shadow="base"
              rounded="lg"
              p="10"
              mb="15px"
            >
              <Box w="60px">
                <Image
                  w="40px"
                  borderRadius="4px"
                  name={country.alpha2Code}
                  src={country.flag}
                />
              </Box>
              <Box>
                <Link
                  href="/country/[id]"
                  as={`/country/${country.alpha3Code}`}
                  key={country.name}
                >
                  <Text fontWeight="bold">{country.name}</Text>
                </Link>
              </Box>
              <Box>{country.region}</Box>
              <Box>{numberFormat(country.population)}</Box>
              <Box>{numberFormat(country.area)}</Box>
            </Grid>
          ))}

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
                    <Image
                      w="40px"
                      borderRadius="4px"
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
                  <Td isNumeric>{numberFormat(country.population)}</Td>
                  <Td isNumeric>{numberFormat(country.area)} </Td>
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
  const res = await fetch("https://restcountries.eu/rest/v2/all/");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
export default Home;
