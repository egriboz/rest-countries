const path = require("path");

module.exports = {
  images: {
    domains: ["restcountries.eu", "api-images-www.triposo.com"],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
