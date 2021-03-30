const numberFormat = (amount) => {
  return new Intl.NumberFormat("en-GB").format(amount);
};

export default numberFormat;
