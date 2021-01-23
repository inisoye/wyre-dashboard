// Formats Numbers which are greater than three digits with necessary commas
const numberFormatter = (x) => {
  if (!x) return;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { numberFormatter };
