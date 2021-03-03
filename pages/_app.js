import { useEffect } from "react";
import Head from "next/head";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "(_app.js) :Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log(
              "(_app.js) : Service Worker registration failed: ",
              err
            );
          }
        );
      });
    }
  }, []);
  return (
    <>
      <ChakraProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
}
