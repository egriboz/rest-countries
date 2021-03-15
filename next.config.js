const path = require("path");

module.exports = {
  images: {
    domains: ["restcountries.eu"],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
