import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import unfetch from "isomorphic-unfetch";
import {
  Box,
  Container,
  Flex,
  Avatar,
  StarIcon,
  Heading,
  Image,
  Badge,
  Square,
  Link,
  Text,
} from "@chakra-ui/react";

// lowercase text
const lowerCaseText = (amount) => {
  return amount.toLowerCase();
};

// get country
const getCountry = async (id) => {
  const data = await unfetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
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
      <Container
        mt="30px"
        maxW="container.lg"
        border="2px"
        borderColor="gray.100"
        borderRadius="10px"
        padding="30px"
      >
        <Flex>
          <Box>
            <Link href="/">Back</Link>
          </Box>
          <Box w="200px">
            <Image src={country.flag} alt={country.name} borderRadius="4px" />
          </Box>
          <Box ml="3">
            <Heading as="h1" size="md">
              {country.name}
            </Heading>
            <Heading as="h2" size="sm">
              {country.altSpellings[2]}
            </Heading>
            <Box>
              <Badge ml="1" colorScheme="purple">
                {country.alpha2Code}
              </Badge>
              <Badge ml="1" colorScheme="purple">
                {country.alpha3Code}
              </Badge>
            </Box>
            <Box>
              <Text fontSize="sm">{country.capital}</Text>
              <Text fontSize="sm">{country.region}</Text>
              <Text fontSize="sm">{country.subregion}</Text>
              <Text>{country.nativeName}</Text>
              <Text>{country.capital}</Text>
              <Text>{country.alpha2Code}</Text>
              <Text>{country.callingCodes}</Text>
              <Text>{country.population}</Text>
              <Text>{country.area}</Text>
              <Text>{country.gini}%</Text>
            </Box>

            <Box flex="1">
              <Heading as="h4" size="sm">
                Neighbors
              </Heading>
              {borders.map(({ flag, name, alpha3Code }) => (
                <Link key={flag} href={`/country/${alpha3Code}`}>
                  <Flex>
                    <Avatar src={flag} alt={name}></Avatar>
                    <Text>{name}</Text>
                  </Flex>
                </Link>
              ))}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const data = await unfetch("https://restcountries.eu/rest/v2/all/");
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
//   const data = await unfetch(
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
