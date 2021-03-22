import NextImage from "next/image";
import numberFormat from "../functions/numberFormat";
import lowerCaseText from "../functions/lowerCaseText";
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
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function CountryInfo(props) {
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
            objectFit="cover"
            src={props.country.flag}
            alt={props.country.name}
          />
        </Box>
        <Box mt="20px" mb="30px">
          <Heading as="h1" size="md">
            {props.country.name}
            <Badge ml="1">{props.country.alpha2Code}</Badge>
          </Heading>
          {props.country.altSpellings[2] && (
            <Heading as="h2" size="sm" color="gray.600">
              {props.country.altSpellings[2]}
            </Heading>
          )}
        </Box>
      </GridItem>
      <GridItem colSpan={3} p="15px" fontSize="lg">
        <SimpleGrid
          columns={{
            base: "1",
            sm: "2",
          }}
          spacing={4}
          fontSize=".9em"
        >
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              NATIVE NAME
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {props.country.nativeName} /{" "}
              {props.country.altSpellings.slice(-1)[0]}
            </Text>
          </Box>

          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              CAPITAL
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {props.country.capital}
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              REGION
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {props.country.region}
            </Text>
          </Box>

          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              AREA km<sup>2</sup>
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {numberFormat(props.country.area)}
            </Text>
          </Box>

          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              SUBREGION
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {props.country.subregion}
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              POPULATION
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {numberFormat(props.country.population)}
            </Text>
          </Box>

          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              CALLINGCODES
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              +{props.country.callingCodes}
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              GINI
            </Text>
            <Text fontWeight="semibold" lineHeight="normal">
              {props.country.gini}%
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              CURRENCIES
            </Text>

            {props.country.currencies &&
              props.country.currencies.map((item) => (
                <Text key={item.code} fontWeight="semibold" lineHeight="normal">
                  {item.name} ({item.code})
                </Text>
              ))}
          </Box>
        </SimpleGrid>
        <SimpleGrid mt="30px" mb="30px" columns={2} spacing={4} fontSize=".9em">
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              WIKIPEDIA GLOBAL
            </Text>

            <Link
              href={`https://wikipedia.org/wiki/${props.country.name}`}
              isExternal
            >
              Wikipedia <ExternalLinkIcon />
            </Link>
          </Box>
          <Box>
            <Text color="gray.500" letterSpacing="1px" fontSize="xs">
              WIKIPEDIA LOCAL
            </Text>

            <Link
              href={`https://${lowerCaseText(
                props.country.alpha2Code
              )}.wikipedia.org/wiki/${props.country.name}`}
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
