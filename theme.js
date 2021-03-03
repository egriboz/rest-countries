import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        color: mode("#111111", "#ffffff")(props),
        bg: mode("#ffffff", "#111111")(props),
      },
      "div.border-color-mode-home-right": {
        borderRightColor: mode("#dadce0", "#222222")(props),
      },
      "div.border-color-mode-home-top": {
        borderTopColor: mode("#dadce0", "#222222")(props),
      },
    }),
  },
  colors: {
    gray: {
      50: "#f2f2f3",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a5a5a5",
      400: "#8b8b8b",
      500: "#727272",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0c0d0d",
    },
  },
});

export default theme;
