import { useState, useEffect } from "react";

import NextImage from "next/image";
import NextLink from "next/link";
import { Flex, Box, Grid, Text, Button, GridItem } from "@chakra-ui/react";

import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";

import { orderBy, SortArrow } from "../functions/Sort";

import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import useWindowSize from "../hooks/useWindowSize";
import { UpDownIcon } from "@chakra-ui/icons";

function NeighborCountries(props) {
  const countries = props.countries;
  const { width } = useWindowSize();
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
          // <Box as="section" pos="relative" maxW="100%" key={country.alpha3Code}>
          <Grid
            pos="relative"
            maxW="100%"
            key={country.alpha3Code}
            templateColumns={{
              base: "min-content 1fr",
              md: "min-content 1fr 1fr 1fr 1fr",
            }}
            alignContent="center"
            gap={5}
            bg={bg}
            minH={{
              base: "106px",
              md: "126px",
            }}
            padding={{
              base: "0 25px",
              md: "30px",
            }}
            shadow="base"
            rounded="sm"
            mb="15px"
            style={{ transition: "all .3s" }}
            // hover mode hooks hatası veriyor!
            _hover={{
              bg: bgHover,
              //transform: "scale(1.008)",
              shadow: "lg",
            }}
          >
            <Box
              display="flex"
              alignSelf="center"
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
            </Box>
            <Box display="flex" alignSelf="center" fontWeight="semibold">
              <NextLink
                href="/country/[id]"
                as={`/country/${lowerCaseText(country.alpha3Code)}`}
              >
                <a className="overlayLink" fontWeight="bold">
                  {country.name}
                </a>
              </NextLink>
            </Box>
            {width > 768 && (
              <>
                <Box>
                  <Text color="gray.500" fontSize="xs">
                    REGION
                  </Text>
                  {country.region}
                </Box>

                <Box>
                  <Text color="gray.500" fontSize="xs">
                    POPULATION
                  </Text>
                  {numberFormat(country.population)}
                </Box>
                <Box>
                  <Text color="gray.500" fontSize="xs">
                    AREA km<sup>2</sup>
                  </Text>
                  {numberFormat(country.area)}
                </Box>
              </>
            )}
          </Grid>
          // </Box>
        ))}
    </>
  );
}
export default NeighborCountries;
