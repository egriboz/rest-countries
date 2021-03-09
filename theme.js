// theme.js
// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        color: mode("#1a202c", "#edf2f7")(props),
        bg: mode("#edf2f7", "#1a202c")(props),
      },
    }),
  },
  // colors: {
  //   gray: {
  //     50: "#f2f2f3",
  //     100: "#d9d9d9",
  //     200: "#bfbfbf",
  //     300: "#a5a5a5",
  //     400: "#8b8b8b",
  //     500: "#727272",
  //     600: "#595959",
  //     700: "#404040",
  //     800: "#262626",
  //     900: "#0c0d0d",
  //   },
  // },
});
export default theme;
