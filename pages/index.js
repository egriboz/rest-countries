import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import Neighbors from "../components/Neighbors";
import SiteConfig from "../site.config";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import SearchFilterButtons from "../components/SearchFilterButtons";
import { Container, Center, Box, Button } from "@chakra-ui/react";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};
function Home({ countries }) {
  const router = useRouter();
  const query = router.query;

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (query !== undefined && query.region !== undefined) {
      setKeyword(query.region);
      router.push({
        query: { region: query.region },
      });
    }
  }, [query.region]);

  const includesCountries = countries.filter(function (country) {
    if (country.region) {
      return (
        country.region.toLowerCase().includes(keyword) ||
        country.name.toLowerCase().includes(keyword) ||
        country.nativeName.toLowerCase().includes(keyword)
      );
    } else {
      return (
        country.name.toLowerCase().includes(keyword) ||
        country.nativeName.toLowerCase().includes(keyword)
      );
    }
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  function getRegion(e) {
    e.preventDefault();
    const dataRegion = e.target.getAttribute("data-region").toLowerCase();
    //setClick(true);
    router.push({
      query: { region: dataRegion },
    });

    setKeyword(dataRegion);
  }

  return (
    <Layout>
      <Head>
        <title>{SiteConfig.title}</title>
      </Head>

      <Container maxW="container.lg">
        <Center
          p="80px 0 100px 0"
          fontSize="1.8em"
          color={mode("gray.900", "gray.50")}
        >
          {SiteConfig.description}
        </Center>
      </Container>
      <Container
        maxW="container.lg"
        mt={{
          base: "-32px",
          sm: "-32px",
        }}
        p={{
          base: "0px 15px",
          sm: "0px 50px",
        }}
      >
        <Search onChange={onInputChange} />
      </Container>
      <Container
        maxW="container.lg"
        p={{
          base: "0px 15px",
          sm: "0px 50px",
        }}
      >
        <Carousel responsive={responsive}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Carousel>
        <SearchFilterButtons
          onClick={getRegion}
          length={includesCountries.length}
        />
      </Container>
      <Container
        maxW="container.lg"
        pt={{
          base: "30px",
          sm: "100px",
        }}
      >
        <Neighbors
          countries={includesCountries}
          test={includesCountries.length}
          keyword={keyword}
        />
        <Center as="small" mt="30px" color="gray.500">
          Found {includesCountries.length} countries
        </Center>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all/");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};

export default Home;
