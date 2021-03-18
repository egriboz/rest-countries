const numberFormat = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    maximumSignificantDigits: 3,
  }).format(amount);
};

export default numberFormat
