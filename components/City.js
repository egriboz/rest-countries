import React, { useEffect, useState } from "react";

import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { Flex, SimpleGrid, Heading } from "@chakra-ui/layout";

const City = (props) => {
  console.log(props.code, "---");
  // function City(props) {
  const API_TOKEN = "esezzbg9fbvgfgke78driknff8nisqnt"; // process.env.API_TOKEN
  const ACCOUNT_ID = "OQFQW9HT"; // process.env.ACCOUNT_ID
  const [data, setData] = useState(null);
  const country2code = props.code;
  const URL = [
    "https://www.triposo.com/api/20210317/location.json",
    "?",
    `countrycode=${country2code}`,
    "&",
    `account=${ACCOUNT_ID}`,
    "&",
    `token=${API_TOKEN}`,
  ].join("");
  const [httpStatusCode, setHttpStatusCode] = React.useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      setHttpStatusCode(data.code);
      setData(data);
      console.log(data, data.code);
      // console.log(data.results[0].name);
      // data.results.map((i) => {
      //   i.id
      //   return console.log(i.id)
      // })
    };
    fetchData();
  }, [country2code]);
  if (httpStatusCode === 8) {
    return <p>city information is not available</p>;
  } else {
    return (
      <>
        <Heading as="h4" size="sm" mb="30px">
          Some Cities
          {/* {data && <span>({data.results.length})</span>} */}
        </Heading>

        <SimpleGrid mt="30px" mb="60px" minChildWidth="220px" spacing="10px">
          {data &&
            data.results.map((city) => (
              <Flex
                align="center"
                justifyContent="center"
                key={city.id}
                bg={mode("white", "gray.700")}
                shadow="base"
                rounded="sm"
                borderRadius="4px"
                height="80px"
              >
                {city.name}
                <Avatar src={city.images[0].sizes.thumbnail.url} />
              </Flex>
            ))}
        </SimpleGrid>
      </>
    );
  }
};

export default City;
