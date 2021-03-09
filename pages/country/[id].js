import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";

import {
  Container,
  Flex,
  Heading,
  Grid,
  GridItem,
  Image,
  Badge,
  Link,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

// lowercase text
const lowerCaseText = (amount) => {
  return amount.toLowerCase();
};

// get country
const getCountry = async (id) => {
  const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await data.json();
  return country;
};

// get detail
const CountryDetail = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  console.log(borders);
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
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/">Country</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{country.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
      <Container
        mt="30px"
        maxW="container.lg"
        padding="30px"
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
          <GridItem colSpan={2}>
            <Link href="/">Back</Link>
          </GridItem>
          <GridItem colSpan={4}>
            <Text fontSize="sm">capital:{country.capital}</Text>
            <Text fontSize="sm">region:{country.region}</Text>
            <Text fontSize="sm">subregion:{country.subregion}</Text>
            <Text>nativeName:{country.nativeName}</Text>
            <Text>callingCodes:+{country.callingCodes}</Text>
            <Text>population:{country.population}</Text>
            <Text>area:{country.area}</Text>
            <Text>gini:{country.gini}%</Text>

            <Heading as="h4" size="sm" mt="30px" mb="30px">
              Neighbors
            </Heading>
            {borders.map(({ flag, name, alpha3Code }) => (
              <Link key={flag} href={`/country/${alpha3Code}`}>
                <Flex spacing={3}>
                  <Image
                    src={flag}
                    alt={name}
                    w="60px"
                    borderRadius="4px"
                    border="1px"
                    borderColor="gray.100"
                  />
                  <Heading as="h4" size="xs" pl="15px" fontWeight="bold">
                    {name}
                  </Heading>
                </Flex>
              </Link>
            ))}
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

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
