import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import {
  Grid,
  Flex,
  Text,
  SimpleGrid,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

function City(props) {
  // function City(props) {
  const API_TOKEN = "esezzbg9fbvgfgke78driknff8nisqnt"; // process.env.API_TOKEN
  const ACCOUNT_ID = "OQFQW9HT"; // process.env.ACCOUNT_ID
  const bg = mode("white", "gray.700");
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
      // console.log(data, data.code);
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

        <SimpleGrid mt="30px" mb="60px" minChildWidth="320px" spacing="15px">
          {data &&
            data.results.map((city) => (
              <LinkBox
                key={city.id}
                w="100%"
                maxW="100%"
                display="block"
                fontWeight="semibold"
              >
                <Flex
                  p="15px"
                  alignItems="center"
                  bg={bg}
                  shadow="base"
                  rounded="sm"
                  borderRadius="4px"
                >
                  <Avatar
                    size="lg"
                    mr="15px"
                    src={city.images[0].sizes.original.url}
                  />

                  <LinkOverlay
                    href={city.images[0].attribution.attribution_link}
                    target="_blank"
                  >
                    {city.name}
                  </LinkOverlay>
                </Flex>
              </LinkBox>
            ))}
        </SimpleGrid>
      </>
    );
  }
}

export default City;
