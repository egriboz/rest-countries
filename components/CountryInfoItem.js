import { Box, Text, useColorModeValue as mode } from "@chakra-ui/react";

function CountryInfoItem({ title, value }) {
  return (
    <Box
      border="1px"
      p="15px"
      rounded="2px"
      borderColor={mode("gray.100", "whiteAlpha.50")}
    >
      <Text color="gray.500" fontSize="xs">
        {title}
      </Text>
      <Text fontWeight="bold" lineHeight="normal">
        {value}
      </Text>
    </Box>
  );
}

export default CountryInfoItem;
