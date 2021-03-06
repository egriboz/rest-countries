import Layout from "../../components/layout";
import Head from "next/head";
import unfetch from "isomorphic-unfetch";
// import slug from 'slug'
import { Box, Container, Flex, Avatar, StarIcon, Badge, Square, Text } from "@chakra-ui/react";

function CharacterDetail({ country }) {
  // const property = {
  //   imageUrl: "https://bit.ly/2Z4KKcF",
  //   imageAlt: "Rear view of modern home with pool",
  //   beds: 3,
  //   baths: 2,
  //   title: "Modern home in city center in the heart of historic Los Angeles",
  //   formattedPrice: "$1,900.00",
  //   reviewCount: 34,
  //   rating: 4,
  // }
  return (
    <Layout>
      <Head>
        <title>{country.name}</title>
      </Head>
      <Container mt="30px" maxW="container.lg">
        <Flex>
          <Box w="400px">
            <img src={country.flag} alt={country.name} />
          </Box>
          <Box ml="3">
            <Text as="h1" fontWeight="bold">
              {country.name}
              <Badge ml="1" colorScheme="purple">
              {country.alpha2Code}
              </Badge>
              <Badge ml="1" colorScheme="purple">
              {country.alpha3Code}
              </Badge>
            </Text>
            <Text fontSize="sm">{country.altSpellings[2]}</Text>
            <Text fontSize="sm">{country.capital}</Text>
            <Text fontSize="sm">{country.region}</Text>
            <Text fontSize="sm">{country.subregion}</Text>
            
          </Box>
        </Flex>
        <Flex>
          <Box flex="1">
            <ul>
              <li>{country.nativeName}</li>
              <li>{country.capital}</li>
              <li>{country.alpha2Code}</li>
              <li>{country.callingCodes}</li>
              {/* 
              <li>{country.altSpellings[2]}</li>
              <li>{country.population}</li>
              <li>{country.area}</li>
              <li>{country.gini}</li>
              <li>{country.borders}</li>
              <li>{country.currencies.code}</li>
              <li>{country.currencies.name}</li>
              <li>{country.languages.name}</li>
              <li>{country.languages.nativeName}</li> 
              */}
              
            </ul>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
}

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

export async function getStaticProps({ params }) {
  const data = await unfetch(
    "https://restcountries.eu/rest/v2/alpha/" + params.id
  );
  const country = await data.json();

  return {
    props: {
      country,
    },
  };
}

export default CharacterDetail;