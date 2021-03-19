import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import Head from "next/head";

import Layout from "../../components/layout";
import BreadCrumb from "../../components/Breadcrumb";
import NeighborsCountries from "../../components/NeighborsCountries";

import numberFormat from "../../functions/numberFormat";
import lowerCaseText from "../../functions/lowerCaseText";
import {
  Container,
  Link,
  Heading,
  Grid,
  GridItem,
  Badge,
  Button,
  Avatar,
  AvatarGroup,
  Box,
  Text,
  useColorModeValue as mode,
  useMediaQuery,
  SimpleGrid,
} from "@chakra-ui/react";
import { ExternalLinkIcon, LinkIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const getCountry = async (id) => {
  const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await data.json();
  return country;
};
// get detail
// const CountryDetail = ({ country }) => {
function CountryDetail({ country }) {
  const API_TOKEN = "esezzbg9fbvgfgke78driknff8nisqnt";
  const ACCOUNT_ID = "OQFQW9HT";
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://www.triposo.com/api/20210317/location.json?id=Turkey&account=${ACCOUNT_ID}&token=${API_TOKEN}`
      );

      const resultsData = await data.json();
      setData(resultsData);
      console.log(resultsData);
      console.log(resultsData.results[0].name);
    };

    fetchData();
  }, []);

  // const router = useRouter();
  // const ID = router.query.id;
  // const { asPath } = useRouter();
  const bgHover = mode("white", "#282e3c");
  const bg = mode("white", "gray.700");
  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const getBorders = async () => {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );
      setBorders(borders);
    };
    getBorders();
  }, [country, setBorders]);

  return (
    <Layout flag={country.name}>
      <Head>
        <title>{country.name}</title>
      </Head>

      <Container maxW="container.lg" mt="30px">
        <BreadCrumb name={country.name} />
      </Container>

      <Container mt="10px" pt="15px" pb="15px" maxW="container.lg">
        <Grid
          h="100%"
          templateRows="repeat(1, 1fr)"
          // templateColumns="repeat(3, 1fr)"
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(5, 1fr)",
          }}
          columnGap={{
            base: "0",
            sm: "0",
          }}
          rowGap={{
            base: "5",
            sm: "0",
          }}
          bg={mode("white", "gray.700")}
          shadow="base"
          rounded="sm"
          borderRadius="4px"
        >
          <GridItem
            colSpan={2}
            p="15px"
            pos="relative"
            // bg={mode("white", "gray.700")}
            // shadow="base"
            // rounded="sm"
            // borderRadius="4px"
          >
            <Box shadow="xs" lineHeight="0">
              <NextImage
                width={1200}
                height={800}
                layout="responsive"
                objectFit="cover"
                src={country.flag}
                alt={country.name}
              />
            </Box>
            <Box mt="20px" mb="30px">
              <Heading as="h1" size="md">
                {country.name}
                <Badge ml="1">{country.alpha2Code}</Badge>
              </Heading>
              {country.altSpellings[2] && (
                <Heading as="h2" size="sm" color="gray.600">
                  {country.altSpellings[2]}
                </Heading>
              )}
            </Box>

            <SimpleGrid columns={2} spacing={4} fontSize=".9em">
              {/* <Box>
                <Text color="gray.400" fontSize="xs">
                  CAPITAL
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.capital}
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  REGION
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.region}
                </Text>
              </Box> */}
            </SimpleGrid>
          </GridItem>
          <GridItem
            colSpan={3}
            p="15px"
            // bg={mode("white", "gray.700")}
            // shadow="base"
            // rounded="sm"
          >
            <SimpleGrid
              columns={{
                base: "1",
                sm: "2",
              }}
              spacing={4}
              fontSize=".9em"
            >
              <Box>
                <Text color="gray.400" fontSize="xs">
                  NATIVE NAME
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.nativeName} / {country.altSpellings.slice(-1)[0]}
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  NEIGHBORS COUNTRIES
                </Text>
                <a href="#neighbors-countries">
                  <AvatarGroup spacing="-5px" size="sm" max={2}>
                    {borders &&
                      borders.map((country) => (
                        <Avatar
                          key={country.alpha3Code}
                          name={country.name}
                          src={country.flag}
                        />
                      ))}
                  </AvatarGroup>
                </a>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  CAPITAL
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.capital}
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  REGION
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.region}
                </Text>
              </Box>

              <Box>
                <Text color="gray.400" fontSize="xs">
                  AREA km<sup>2</sup>
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {numberFormat(country.area)}
                </Text>
              </Box>

              <Box>
                <Text color="gray.400" fontSize="xs">
                  SUBREGION
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.subregion}
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  POPULATION
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {numberFormat(country.population)}
                </Text>
              </Box>

              <Box>
                <Text color="gray.400" fontSize="xs">
                  CALLINGCODES
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  +{country.callingCodes}
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  GINI
                </Text>
                <Text fontWeight="semibold" lineHeight="normal">
                  {country.gini}%
                </Text>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  CURRENCIES
                </Text>
                {country.currencies &&
                  country.currencies.map((item) => (
                    <Text
                      key={item.code}
                      fontWeight="semibold"
                      lineHeight="normal"
                    >
                      {item.name} ({item.code})
                    </Text>
                  ))}
              </Box>
            </SimpleGrid>
            <SimpleGrid
              mt="30px"
              mb="30px"
              columns={2}
              spacing={4}
              fontSize=".9em"
            >
              <Box>
                <Text color="gray.400" fontSize="xs">
                  WIKIPEDIA GLOBAL
                </Text>

                <Link
                  href={`http://wikipedia.org/wiki/${country.name}`}
                  isExternal
                >
                  Wikipedia <ExternalLinkIcon />
                </Link>
              </Box>
              <Box>
                <Text color="gray.400" fontSize="xs">
                  WIKIPEDIA LOCAL
                </Text>

                <Link
                  href={`http://${lowerCaseText(
                    country.alpha2Code
                  )}.wikipedia.org/wiki/${country.name}`}
                  isExternal
                >
                  Wikipedia <ExternalLinkIcon />
                </Link>
              </Box>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
      <Container pt="30px" maxW="container.lg" id="neighbors-countries">
        <Box>
          {/* <ul>
            {data.results.images.map((item, index) => (
              <li key={item.index}>{item.caption}</li>
            ))}
          </ul> */}
        </Box>
        <Box>
          <Heading as="h4" size="sm" mb="30px">
            Neighbors Countries ({borders.length})
          </Heading>
        </Box>
        {borders &&
          borders.map((country) => (
            <NeighborsCountries key={country.alpha3Code} data={country} />
          ))}
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
  );
}

export async function getStaticPaths() {
  const data = await fetch("https://restcountries.eu/rest/v2/all/");
  const countries = await data.json();

  const paths = countries.map((country) => {
    return { params: { id: `${lowerCaseText(country.alpha3Code)}` } };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};

export default CountryDetail;
