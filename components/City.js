import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { Alert, AlertIcon, Avatar } from "@chakra-ui/react";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import {
  Grid,
  Flex,
  Badge,
  Text,
  Box,
  SimpleGrid,
  Heading,
  LinkBox,
  LinkOverlay,
  GridItem,
} from "@chakra-ui/layout";

function City({ countryCode, countryName }) {
  // const code = props.code;
  // const name = props.name;
  // console.log(props, "City");
  // function City(props) {
  const API_TOKEN = "esezzbg9fbvgfgke78driknff8nisqnt"; // process.env.API_TOKEN
  const ACCOUNT_ID = "OQFQW9HT"; // process.env.ACCOUNT_ID
  const api_token = process.env.API_TOKEN;
  const account_id = process.env.ACCOUNT_ID;
  const bg = mode("white", "gray.700");
  const [data, setData] = useState(null);
  const country2code = countryCode;
  const URL = [
    "https://www.triposo.com/api/20210317/location.json",
    "?",
    `countrycode=${country2code}`,
    "&",
    `account=${ACCOUNT_ID}`,
    "&",
    `token=${API_TOKEN}`,
    "&",
    `count=9`,
  ].join("");
  const [httpStatusCode, setHttpStatusCode] = React.useState();
  useEffect(() => {
    const getCity = async () => {
      const res = await fetch(URL);
      const data = await res.json();

      setHttpStatusCode(data.code);
      setData(data);

      // console.log(data, data.code);
      // console.log(data.results[0].name);
      // console.log(data.results.length);
      // const size = data.results.length;

      // data.results.map((i) => {
      //   i.id
      //   return console.log(i.id)
      // })
    };
    getCity();
  }, [country2code]);

  if (httpStatusCode === 8) {
    return (
      <Alert status="info">
        <AlertIcon />
        City information is not available
      </Alert>
    );
  } else {
    return (
      <>
        <Heading as="h4" size="sm" mb="30px">
          Some popular cities in {countryName} {process.env.ACCOUNT_ID}
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
                  minH="102px"
                >
                  <Box w="60px" h="60px" rounded="full" overflow="hidden">
                    <NextImage
                      width={400}
                      height={400}
                      objectFit="cover"
                      src={city.images[0].sizes.thumbnail.url.replace(
                        "http://",
                        "https://"
                      )}
                      alt={city.name}
                    />
                  </Box>
                  {/* <Avatar
                    size="lg"
                    mr="15px"
                    name={city.name}
                    src={city.images[0].sizes.thumbnail.url.replace(
                      "http://",
                      "https://"
                    )}
                  /> */}

                  <LinkOverlay
                    pl="15px"
                    href={city.images[0].attribution.attribution_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {city.score.toFixed(1) >= 9 && (
                      <Box
                        position="absolute"
                        top="15px"
                        right="15px"
                        w="10px"
                        h="10px"
                        rounded="full"
                        bg="green.500"
                      />
                    )}
                    <Text>{city.name}</Text>
                    <Badge fontSize="0.7em">
                      Score {city.score.toFixed(1)}
                    </Badge>
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
