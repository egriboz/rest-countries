import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import Neighbors from "../components/Neighbors";
import NeighborsCountries from "../components/NeighborsCountries";
// import SearchInput from "../components/searchInput";
import lowerCaseText from "../functions/lowerCaseText";
import SiteConfig from "../site.config";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import SearchFilterButtons from "../components/SearchFilterButtons";
import { Container, Box, Center } from "@chakra-ui/react";

// const orderBy = (countries, value, direction) => {
//   if (direction === "asc") {
//     return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
//   }

//   if (direction === "desc") {
//     return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
//   }

//   return countries;
// };

function Home({ countries }) {
  const router = useRouter();
  const query = router.query;

  // const [value, setValue] = useState();
  // const [direction, setDirection] = useState();

  const [keyword, setKeyword] = useState("");
  const [click, setClick] = useState(false);

  setTimeout(function () {
    if (query !== undefined && query.region !== undefined && !click) {
      setKeyword(query.region);
    }
  }, 0);

  // console.log(click, "click");
  const includesCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.nativeName.toLowerCase().includes(keyword)
  );
  // const orderedCountries = orderBy(countries, value, direction);
  // const switchDirection = () => {
  //   if (!direction) {
  //     setDirection("desc");
  //   } else if (direction === "desc") {
  //     setDirection("asc");
  //   } else {
  //     setDirection(null);
  //   }
  // };

  // const setValueAndDirection = (value) => {
  //   switchDirection();
  //   setValue(value);
  // };

  // const filteredAndSortedKeywords = countries.sort(function (a, b) {
  //   return b.name.localeCompare(a.name);
  // });

  // console.log("filteredAndSortedKeywords:", filteredAndSortedKeywords);

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  function getRegion(e) {
    e.preventDefault();
    let dataRegion = e.target.getAttribute("data-region");
    // console.log(dataRegion);
    setClick(true);
    router.push({
      query: { region: dataRegion },
    });

    setKeyword(dataRegion);

    // router.replace(dataRegion);
    // console.log("query: ", query.region);
  }

  return (
    <Layout>
      <Head>
        <title>{SiteConfig.title}</title>
      </Head>
      <Container maxW="container.lg">
        <Search onChange={onInputChange} />
        <SearchFilterButtons
          onClick={getRegion}
          length={includesCountries.length}
        />
        <Neighbors
          countries={includesCountries}
          test={includesCountries.length}
        />
        {/* <Box>
          <button onClick={() => setValueAndDirection("name")}>Name</button>
          <button onClick={() => setValueAndDirection("population")}>
            Test
          </button>
        </Box> */}

        {/* {includesCountries &&
          includesCountries.map((country) => (
            <NeighborsCountries
              key={lowerCaseText(country.alpha3Code)}
              data={country}
            />
          ))} */}
        {/* <style jsx global>{`
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
        `}</style> */}
        <Center as="small" mt="30px" color="gray.500">
          Found {includesCountries.length} countries
        </Center>
      </Container>
    </Layout>
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
