import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import NextImage from "next/image";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

import Layout from "../../components/layout";
import BreadCrumb from "../../components/Breadcrumb";
import NeighborsCountries from "../../components/NeighborsCountries";
import Neighbors from "../../components/Neighbors";
import CountryInfo from "../../components/CountryInfo";
import City from "../../components/City";

import lowerCaseText from "../../functions/lowerCaseText";
import { Container, Heading, Box } from "@chakra-ui/react";

const getCountry = async (id) => {
  const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await data.json();
  return country;
};
// get detail
function CountryDetail({ country }) {
  const [borders, setBorders] = useState([]);
  const currentFlag = country.flag;
  useEffect(() => {
    const getBorders = async () => {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );
      setBorders(borders);
    };
    getBorders();
  }, [country]);

  return (
    <Layout flag={country.name}>
      <Head>
        <title>{country.name}</title>
      </Head>

      <Container
        maxW="100%"
        bg="gray.800"
        p="100px 0 100px 0"
        // backgroundImage={`url(${country.flag})`}
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
        // backgroundSize="cover"

        // filter="blur(40px)"
        // _before={{ with: "200px", backgroundImage: "lg" }}
      >
        <Container maxW="container.lg" pos="relative" zIndex="1">
          <Heading as="h1" color="white" mb="15px">
            {country.name}

            {/* ({country.altSpellings[2]}) */}
          </Heading>

          <BreadCrumb name={country.name} />
        </Container>
      </Container>

      <Container
        pos="relative"
        mt="-70px"
        pt="15px"
        pb="15px"
        maxW="container.lg"
      >
        <CountryInfo country={country} />
      </Container>
      <Container pt="30px" maxW="container.lg">
        <City code={country.alpha2Code} />
      </Container>
      <Container pt="30px" maxW="container.lg">
        <Box>
          <Heading as="h4" size="sm" mb="30px">
            Neighbors Countries ({borders.length})
          </Heading>
        </Box>
        <Neighbors countries={borders} test={borders.length} />
        {/* {borders &&
          borders.map((country) => (
            <NeighborsCountries key={country.alpha3Code} data={country} />
          ))} */}
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
