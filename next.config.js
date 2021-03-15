const path = require("path");

module.exports = {
  images: {
    loader: "imgix",
    domains: ["restcountries.eu"],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
