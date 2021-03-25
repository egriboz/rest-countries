import NextImage from "next/image";
import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";
import CountryInfoItem from "../components/CountryInfoItem";
import {
  Link,
  Heading,
  Grid,
  GridItem,
  Badge,
  Box,
  Text,
  useColorModeValue as mode,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Aerasup = () => {
  return (
    <>
      AREA km<sup>2</sup>
    </>
  );
};

function CountryInfo({ country }) {
  // console.log(props, "props");
  // const country = props.country;
  return (
    <Grid
      h="100%"
      templateRows="repeat(1, 1fr)"
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(5, 1fr)",
      }}
      columnGap={{
        base: "0",
        sm: "0",
      }}
      rowGap={{
        base: "5",
        sm: "0",
      }}
      bg={mode("white", "gray.700")}
      shadow="base"
      rounded="sm"
      borderRadius="4px"
    >
      <GridItem colSpan={2} p="15px" pos="relative">
        <Box shadow="xs" lineHeight="0">
          <NextImage
            width={1200}
            height={800}
            layout="responsive"
            objectFit="contain"
            src={country.flag}
            alt={country.name}
          />
        </Box>
        <Box mt="20px" mb="30px">
          <Heading size="md">{country.name}</Heading>
          {country.altSpellings[2] && (
            <Heading as="h2" size="sm">
              {country.altSpellings[2]}
              <Badge ml="1">{country.alpha2Code}</Badge>
            </Heading>
          )}
        </Box>
      </GridItem>
      <GridItem colSpan={3} p="15px">
        <SimpleGrid
          columns={{
            base: "1",
            sm: "2",
          }}
          spacing={4}
          fontSize="1em"
        >
          <CountryInfoItem title="DEMONYM" value={country.demonym} />
          <CountryInfoItem
            title="NATIVE NAME"
            value={`${country.nativeName} ~ ${
              country.altSpellings.slice(-1)[0]
            }`}
          />
          <CountryInfoItem title="CAPITAL" value={country.capital} />
          <CountryInfoItem title="REGION" value={country.region} />
          <CountryInfoItem
            title={<Aerasup />}
            value={numberFormat(country.area)}
          />
          <CountryInfoItem title="SUBREGION" value={country.subregion} />
          <CountryInfoItem
            title="POPULATION"
            value={numberFormat(country.population)}
          />
          <CountryInfoItem
            title="CALLINGCODES"
            value={`+${country.callingCodes}`}
          />
          <CountryInfoItem title="GINI" value={`${country.gini}%`} />
          <Box>
            <Text color="gray.500" fontSize="xs">
              CURRENCIES
            </Text>
            {country.currencies &&
              country.currencies.map((item) => (
                <Text key={item.code} fontWeight="bold" lineHeight="normal">
                  {item.name} ({item.code})
                </Text>
              ))}
          </Box>
        </SimpleGrid>
        <SimpleGrid mt="30px" mb="30px" columns={2} spacing={4} fontSize=".9em">
          <Box>
            <Text color="gray.500" fontSize="xs">
              WIKIPEDIA GLOBAL
            </Text>

            <Link
              href={`https://wikipedia.org/wiki/${country.name}`}
              isExternal
            >
              Wikipedia <ExternalLinkIcon />
            </Link>
          </Box>
          <Box>
            <Text color="gray.500" fontSize="xs">
              WIKIPEDIA LOCAL
            </Text>

            <Link
              href={`https://${lowerCaseText(
                country.alpha2Code
              )}.wikipedia.org/wiki/${country.name}`}
              isExternal
            >
              Wikipedia <ExternalLinkIcon />
            </Link>
          </Box>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
}
export default CountryInfo;
