import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";
import { Chakra } from "../components/Chakra";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Chakra cookies={pageProps.cookies}>
        <CSSReset />
        <Component {...pageProps} />
      </Chakra>
    </ChakraProvider>
  );
}
export { getServerSideProps } from "../components/Chakra";
