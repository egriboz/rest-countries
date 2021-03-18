import { Input } from "@chakra-ui/input";
import { Flex, Box } from "@chakra-ui/layout";
import { useColorModeValue as mode } from "@chakra-ui/color-mode";
function Search(props) {
  return (
    <Flex
      mt={{
        base: "50px",
        sm: "70px",
      }}
      mb="30px"
    >
      <Box flex="1" position="relative">
        <Box
          w="20px"
          position="absolute"
          zIndex="2"
          top="50%"
          transform="translateY(-10px)"
          left="24px"
          color="gray.500"
          opacity=".5"
        >
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
            ></path>
          </svg>
        </Box>

        <Input
          textTransform="capitalize"
          size="lg"
          pt="30px"
          pb="30px"
          fontSize={{
            base: "initial",
            sm: "md",
          }}
          fontWeight="medium"
          rounded="full"
          paddingLeft="60px"
          placeholder="Search by Country Name or Region"
          bg={mode("white", "gray.700")}
          color="brand"
          onChange={props.onChange}
        />
      </Box>
    </Flex>
  );
}

export default Search;
