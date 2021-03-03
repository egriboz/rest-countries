import React, { useState, useEffect } from "react";

import Head from "next/head";
import Layout from "../components/layout";
import SearchInput from "../components/searchInput";
import SiteConfig from "../site.config";
import styles from "../styles/Home.module.css";

function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  function getRegion(e) {
    e.preventDefault();
    console.log("Get Europe");
    const filteredRegion = countries.filter((country) =>
      country.region.toLowerCase().includes("europe")
    );
    console.log(filteredRegion);
  }

  return (
    <>
      <Layout>
        <Head>
          <title>{SiteConfig.title}</title>
        </Head>
        <button onClick={getRegion}>Get Europe</button>
        <SearchInput placeholder="Filter by Name" onChange={onInputChange} />

        <p>Found {countries.length} countries</p>
        <ul className="thlist">
          {filteredCountries.map((country) => (
            <li key={country.alpha3Code}>{country.name}</li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
export default Home;
