import { useState, useEffect } from "react";

import NextImage from "next/image";
import NextLink from "next/link";
import { Flex, Box, Grid, Text, Button, GridItem } from "@chakra-ui/react";

import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";

import { orderBy, SortArrow } from "../functions/Sort";

import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";
import { UpDownIcon } from "@chakra-ui/icons";

function NeighborCountries(props) {
  const countries = props.countries;

  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const bgHover = mode("white", "#282e3c");
  const bg = mode("white", "gray.700");

  const [value, setValue] = useState();
  const [direction, setDirection] = useState(null);

  const countriesOrdered = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <style jsx global>{`
        a.overlayLink {
          margin: 4px 0;
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
      {/* <Button
          size="xs"
          onClick={() => setValueAndDirection("name")}
          rightIcon={value === "name" && <SortArrow direction={direction} />}
        >
          Name
        </Button> */}
      {countriesOrdered.length > 0 && (
        <Flex justifyContent="flex-end" mb="15px">
          <Box flex="1" pl="5px" fontWeight="bold">
            {capitalizeFirstLetter(props.keyword)}
          </Box>
          <Button
            size="xs"
            onClick={() => setValueAndDirection("name")}
            rightIcon={
              value === "name" ? (
                <SortArrow direction={direction} />
              ) : (
                <UpDownIcon />
              )
            }
          >
            Name
          </Button>

          <Button
            ml="10px"
            size="xs"
            onClick={() => setValueAndDirection("population")}
            rightIcon={
              value === "population" ? (
                <SortArrow direction={direction} />
              ) : (
                <UpDownIcon />
              )
            }
          >
            Population
          </Button>
        </Flex>
      )}
      {/* <Box>value: {value}</Box>
      <Box>direction: {direction}</Box> */}

      {countriesOrdered &&
        countriesOrdered.map((country) => (
          <Box pos="relative" as="div" maxW="100%" key={country.alpha3Code}>
            <Grid
              templateRows={{
                base: "repeat(2, 1fr)",
                md: "repeat(1, 1fr)",
              }}
              templateColumns={{
                base: "min-content 1fr 1fr 1fr 1fr",
                md: "min-content 1fr 1fr 1fr 1fr",
              }}
              gap={5}
              bg={bg}
              minH={{
                base: "136px",
                md: "auto",
              }}
              shadow="base"
              rounded="sm"
              p="10"
              mb="15px"
              style={{ transition: "all .3s" }}
              // hover mode hooks hatası veriyor!
              _hover={{
                bg: bgHover,
                //transform: "scale(1.008)",
                shadow: "lg",
              }}
            >
              <GridItem
                rowSpan={{
                  base: "4",
                  md: "1",
                }}
                colSpan={1}
                // display="flex"
                // alignSelf="center"
                w="45px"
                h="30px"
                borderRadius="2px"
                shadow="xs"
              >
                <NextImage
                  className="avatar"
                  width={45}
                  height={30}
                  objectFit="cover"
                  alt={country.name}
                  src={country.flag}
                />
              </GridItem>
              <GridItem
                rowSpan={1}
                colSpan={{
                  base: "4",
                  md: "1",
                }}
                // display="flex"
                // alignItems="center"
                fontWeight="semibold"
              >
                <NextLink
                  href="/country/[id]"
                  as={`/country/${lowerCaseText(country.alpha3Code)}`}
                >
                  <a className="overlayLink" fontWeight="bold">
                    {country.name}
                  </a>
                </NextLink>
              </GridItem>
              {/* {!isLargerThanMD && (
                <> */}
              <GridItem
                colSpan={{
                  base: "5",
                  md: "1",
                }}
                gridColumnStart={{
                  base: "2",
                  md: "auto",
                }}
              >
                <Text color="gray.500" fontSize="xs">
                  REGION
                </Text>
                {country.region}
              </GridItem>

              <GridItem
                colSpan={{
                  base: "5",
                  md: "1",
                }}
              >
                <Text color="gray.500" fontSize="xs">
                  POPULATION
                </Text>
                {numberFormat(country.population)}
              </GridItem>
              <GridItem
                colSpan={{
                  base: "5",
                  md: "1",
                }}
              >
                <Text color="gray.500" fontSize="xs">
                  AREA km<sup>2</sup>
                </Text>
                {numberFormat(country.area)}
              </GridItem>
              {/* </>
              )} */}
            </Grid>
          </Box>
        ))}
    </>
  );
}
export default NeighborCountries;
