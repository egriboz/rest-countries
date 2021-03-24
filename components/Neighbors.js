import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Grid, Text } from "@chakra-ui/layout";
import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";

import { useColorModeValue as mode } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";

function NeighborCountries({ countries }) {
  const [isLargerThanMD] = useMediaQuery("(max-width: 48em)");
  const bgHover = mode("white", "#282e3c");
  const bg = mode("white", "gray.700");
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
      {countries &&
        countries.map((country) => (
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