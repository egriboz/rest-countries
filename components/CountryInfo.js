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
  const borderColor = mode("gray.100", "whiteAlpha.50");
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
      overflow="hidden"
    >
      <GridItem
        colSpan={2}
        p={{
          base: "15px",
          sm: "15px 0px 15px 15px",
        }}
        pos="relative"
      >
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
          {country.name}
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
          
          {country.name && <CountryInfoItem
            title="NATIVE NAME"
            value={country.name}
          />
          }
          {country.nativeName && <CountryInfoItem
            title="NATIVE NAME"
            value={country.nativeName}
          />}
          {country.capital && <CountryInfoItem title="CAPITAL" value={country.capital} />}
          {country.region && <CountryInfoItem title="REGION" value={country.region} />}
          
          {country.area && <CountryInfoItem
            title={<Aerasup />}
            value={numberFormat(country.area)}
          />}
          {country.population && <CountryInfoItem
            title="POPULATION"
            value={numberFormat(country.population)}
          />}
          {country.callingCodes && <CountryInfoItem
            title="CALLINGCODES"
            value={`+${country.callingCodes}`}
          />}
          {country.gini && <CountryInfoItem title="GINI" value={`${country.gini}%`} />}
          <Box border="1px" p="15px" rounded="2px" borderColor={borderColor}>
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
