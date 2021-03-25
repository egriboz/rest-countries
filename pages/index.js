import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/layout";
import Neighbors from "../components/Neighbors";
import SiteConfig from "../site.config";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import SearchFilterButtons from "../components/SearchFilterButtons";
import { Container, Center } from "@chakra-ui/react";

function Home({ countries }) {
  const router = useRouter();
  const query = router.query;

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
