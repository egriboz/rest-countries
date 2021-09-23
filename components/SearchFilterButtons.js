import { Button, ButtonGroup } from "@chakra-ui/button";
import { Flex, Text, Box, Spacer } from "@chakra-ui/layout";
import { CONTINENT } from "../constants";
import useWindowSize from "../hooks/useWindowSize";

function SearchFilterButtons(props) {
  const { width } = useWindowSize();
  return (
    <Flex pl="20px" pr="20px" mb="30px">
      {width > 768 && (
        <>
          <Text color="gray.500" fontSize="sm">
            Filter by continent
          </Text>

          <ButtonGroup
            mb="30px"
            ml="20px"
            size="xs"
            variant="solid"
            spacing="2"
          >
            {CONTINENT.map((item) => {
              return (
                <Button
                  key={item.continent}
                  data-continent={item.continent}
                  onClick={props.onClick}
                  colorScheme={item.colorscheme}
                >
                  {item.title}
                </Button>
              );
            })}
          </ButtonGroup>

          <Spacer />
        </>
      )}
      <Box
        alignSelf="stretch"
        textAlign={{
          base: "center",
          sm: "left",
        }}
      >
        <Text color="gray.500" fontSize="sm">
          Found {props.length} countries
        </Text>
      </Box>
    </Flex>
  );
}
export default SearchFilterButtons;
