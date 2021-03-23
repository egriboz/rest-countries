import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import NeighborsCountries from "../components/NeighborsCountries";
// import SearchInput from "../components/searchInput";
import lowerCaseText from "../functions/lowerCaseText";
import SiteConfig from "../site.config";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import SearchFilterButtons from "../components/SearchFilterButtons";
import { Container, Box, Center } from "@chakra-ui/react";

function Home({ countries }) {
  const router = useRouter();
  const query = router.query;
  const [keyword, setKeyword] = useState("");
  const [click, setClick] = useState(false);
  setTimeout(function () {
    if (query !== undefined && !click) {
      setKeyword(query.region);
    }
  }, 0);

  // console.log(click, "click");
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.nativeName.toLowerCase().includes(keyword)
  );

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
          length={filteredCountries.length}
        />

        {filteredCountries &&
          filteredCountries.map((country) => (
            <NeighborsCountries
              key={lowerCaseText(country.alpha3Code)}
              data={country}
            />
          ))}
        <Center as="small" mt="30px" color="gray.500">
          Found {filteredCountries.length} countries
        </Center>
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
