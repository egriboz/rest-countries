import { useState } from "react";

import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Grid, Text } from "@chakra-ui/layout";
import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";

import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";
// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuOptionGroup,
//   MenuItemOption,
//   MenuDivider,
// } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const orderBy = (countries, value, direction) => {
  if (direction === "asc" && value !== "name") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc" && value !== "name") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  if (direction === "asc" && value === "name") {
    return [...countries].sort((a, b) =>
      a[value].localeCompare > b[value].localeCompare ? 1 : -1
    );
  }

  if (direction === "desc" && value === "name") {
    return [...countries].sort((a, b) =>
      a[value].localeCompare > b[value].localeCompare ? -1 : 1
    );
  }

  return countries;
};

function NeighborCountries(props) {
  // console.log(props, "props");
  // console.log(props.countries, "props countries");

  const countries = props.countries;

  // console.log(countries, "***");

  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const bgHover = mode("white", "#282e3c");
  const bg = mode("white", "gray.700");

  const [value, setValue] = useState("name");
  const [direction, setDirection] = useState("desc");

  const countriesOrdered = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction || direction === "asc") {
      setDirection("desc");
    } else {
      setDirection("asc");
    }
    // else if (direction === "desc") {
    //   setDirection("asc");
    // } else {
    //   setDirection(null);
    // }
  };
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <>
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
      {/* <Box>
        <Menu closeOnSelect={true}>
          <MenuButton as={Button} colorScheme="blue">
            MenuItem
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuDivider />
              <MenuItemOption value="desc">Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup defaultValue="abc" title="Pop" type="radio">
              <MenuItemOption value="abc">Ascending</MenuItemOption>
              <MenuItemOption value="cba">Descending</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box> */}

      <Box>
        <button onClick={() => setValueAndDirection("name")}>
          Name
          {direction === "asc" && value === "name" ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </button>
        <button onClick={() => setValueAndDirection("population")}>
          Population{" "}
          {direction === "asc" && value === "population" ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </button>
      </Box>
      <Box>value: {value}</Box>
      <Box>direction: {direction}</Box>

      {countriesOrdered &&
        countriesOrdered.map((country) => (
          <Box pos="relative" as="div" maxW="100%" key={country.alpha3Code}>
            <Grid
              templateColumns={{
                base: "35px 1fr",
                md: "min-content 2fr 1fr 1fr 1fr",
              }}
              gap={5}
              bg={bg}
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
              <Box
                display="flex"
                alignSelf="center"
                w="45px"
                h="30px"
                borderRadius="2px"
                display="flex"
                alignItems="center"
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
              <Box display="flex" alignItems="center" fontWeight="semibold">
                <NextLink
                  href="/country/[id]"
                  as={`/country/${lowerCaseText(country.alpha3Code)}`}
                >
                  <a className="overlayLink" fontWeight="bold">
                    {country.name} - {country.alpha3Code}
                  </a>
                </NextLink>
              </Box>
              {!isLargerThanMD && (
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
          </Box>
        ))}
    </>
  );
}
export default NeighborCountries;
