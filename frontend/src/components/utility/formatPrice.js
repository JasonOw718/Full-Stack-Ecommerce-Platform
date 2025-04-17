export const formatPrice = (amount) => {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
};

export const formatPriceCalculation = (quantity, price) => {
  return (Number(quantity) * Number(price)).toFixed(2);
};
