import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import Head from "next/head";
import NextLink from "next/link";
import Layout from "../../components/layout";
import {
  Container,
  Flex,
  Heading,
  Grid,
  GridItem,
  Image,
  Badge,
  Button,
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  useColorModeValue as mode,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const numberFormat = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    maximumSignificantDigits: 3,
  }).format(amount);
};

// const lowerCaseText = (amount) => {
//   return amount.toLowerCase();
// };

const getCountry = async (id) => {
  const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await data.json();
  return country;
};
// get detail
// const CountryDetail = ({ country }) => {
function CountryDetail({ country }) {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const router = useRouter();
  const ID = router.query.id;
  const { asPath } = useRouter();
  // const bgHover = mode("#f7fafc", "#282e3c");
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [country, setBorders]);

  console.log("main page function: ", borders);
  return (
    <Layout>
      <Head>
        <title>{country.name}</title>
      </Head>

      <Container maxW="container.lg" mt="30px">
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <NextLink href="/">Home</NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <NextLink href="/">Country</NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <span>{country.name}</span>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
      <Container
        mt="30px"
        pt="15px"
        pb="15px"
        maxW="container.lg"
        bg={mode("white", "gray.700")}
        shadow="base"
        rounded="lg"
      >
        <Grid
          h="100%"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={5}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Image src={country.flag} alt={country.name} borderRadius="4px" />
          </GridItem>
          <GridItem colSpan={2}>
            <Heading as="h1" size="md">
              {country.name}
            </Heading>
            <Heading as="h2" size="sm">
              {country.altSpellings[2]}
            </Heading>
            <Badge ml="1">{country.alpha2Code}</Badge>
            <Badge ml="1">{country.alpha3Code}</Badge>
          </GridItem>
          <GridItem colSpan={2}>col</GridItem>
          <GridItem colSpan={4}>
            <Text fontSize="sm">capital:{country.capital}</Text>
            <Text fontSize="sm">region:{country.region}</Text>
            <Text fontSize="sm">subregion:{country.subregion}</Text>
            <Text>nativeName:{country.nativeName}</Text>
            <Text>callingCodes:+{country.callingCodes}</Text>
            <Text>population:{country.population}</Text>
            <Text>area:{country.area}</Text>
            <Text>gini:{country.gini}%</Text>
          </GridItem>
        </Grid>
      </Container>
      <Container maxW="container.lg">
        <Box>
          <Heading as="h4" size="sm" mt="30px" mb="30px">
            Neighbors Countries ({borders.length})
          </Heading>
        </Box>
        <Box>
          {borders.map(
            ({
              flag,
              name,
              alpha2Code,
              alpha3Code,
              region,
              population,
              area,
            }) => (
              <Box pos="relative" as="div" maxW="100%" key={alpha3Code}>
                <Grid
                  templateColumns={{
                    base: "35px 1fr",
                    md: "min-content 2fr 1fr 1fr 1fr",
                  }}
                  gap={5}
                  bg={mode("white", "gray.700")}
                  // bg={bg} // bu şekilde çözüm _hoverde hala problemli
                  shadow="base"
                  rounded="lg"
                  p="10"
                  mb="15px"
                  style={{ transition: "all .3s" }}
                  // hover mode hooks hatası veriyor!
                  _hover={{
                    bg: mode("white", "#282e3c"),
                    //transform: "scale(1.008)",
                    shadow: "lg",
                  }}
                >
                  <Box w="60px" display="flex" alignItems="center">
                    <Image
                      w="45px"
                      h="30px"
                      objectFit="cover"
                      borderRadius="2px"
                      shadow="xs"
                      alt={name}
                      src={flag}
                    />
                  </Box>
                  <Box display="flex" alignItems="center">
                    <NextLink
                      href="/country/[id]"
                      as={`/country/${alpha3Code}`}
                    >
                      <a className="overlayLink" fontWeight="bold">
                        {name}
                      </a>
                    </NextLink>
                  </Box>
                  {isLargerThanMD && (
                    <>
                      <Box>
                        <Text color="gray.400" fontSize="xs">
                          REGION
                        </Text>
                        {region}
                      </Box>
                      <Box>
                        <Text color="gray.400" fontSize="xs">
                          POPULATION
                        </Text>
                        {numberFormat(population)}
                      </Box>
                      <Box>
                        <Text color="gray.400" fontSize="xs">
                          AREA km<sup>2</sup>
                        </Text>
                        {numberFormat(area)}
                      </Box>
                    </>
                  )}
                </Grid>
              </Box>
            )
          )}
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
  );
}

export async function getStaticPaths() {
  const data = await fetch("https://restcountries.eu/rest/v2/all/");
  const countries = await data.json();

  const paths = countries.map((country) => {
    return { params: { id: `${country.alpha3Code}` } };
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

// export async function getStaticProps({ params }) {
//   const data = await fetch(
//     "https://restcountries.eu/rest/v2/alpha/" + params.id
//   );
//   const country = await data.json();

//   return {
//     props: {
//       country,
//     },
//   };
// }

export default CountryDetail;
