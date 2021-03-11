import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  useColorModeValue as mode,
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
function CountryDetail({ country }) {
  const router = useRouter();
  const ID = router.query.id;
  const { asPath } = useRouter();

  const bg = mode("white", "gray.700");
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
  }, []);

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
            <Heading as="h4" size="sm" mt="30px" mb="30px">
              Neighbors Countries ({borders.length})
            </Heading>

            {borders.map(({ flag, name, alpha3Code }) => (
              <Flex position="relative" as="div" key={name}>
                <Image
                  src={flag}
                  alt={name}
                  w="60px"
                  borderRadius="4px"
                  border="1px"
                  borderColor="gray.100"
                />
                <NextLink href={`/country/${alpha3Code}`}>
                  <a>{name}</a>
                </NextLink>
              </Flex>
            ))}
          </GridItem>
        </Grid>
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
