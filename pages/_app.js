import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
