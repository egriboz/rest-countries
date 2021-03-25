import { Box, Text } from "@chakra-ui/react";

function CountryInfoItem({ title, value, ...rest }) {
  return (
    <Box {...rest}>
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
