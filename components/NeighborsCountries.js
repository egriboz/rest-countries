import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Grid, Text } from "@chakra-ui/layout";
import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";

import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";

function NeighborsCountries(props) {
  const countryNameUrl = `/country/${lowerCaseText(props.data.alpha3Code)}`;
  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const bgHover = mode("white", "#282e3c");
  const bg = mode("white", "gray.700");
  return (
    <Box pos="relative" as="div" maxW="100%">
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
            alt={props.data.name}
            src={props.data.flag}
          />
        </Box>
        <Box display="flex" alignItems="center" fontWeight="semibold">
          <NextLink href="/country/[id]" as={countryNameUrl}>
            <a className="overlayLink" fontWeight="bold">
              {props.data.name}
            </a>
          </NextLink>
        </Box>
        {!isLargerThanMD && (
          <>
            <Box>
              <Text color="gray.500" fontSize="xs">
                REGION
              </Text>
              {props.data.region}
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">
                POPULATION
              </Text>
              {numberFormat(props.data.population)}
            </Box>
            <Box>
              <Text color="gray.500" fontSize="xs">
                AREA km<sup>2</sup>
              </Text>
              {numberFormat(props.data.area)}
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
}
export default NeighborsCountries;
