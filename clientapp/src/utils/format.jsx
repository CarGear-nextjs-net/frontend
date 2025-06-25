const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0);
};
const formatPriceWithoutSymbol = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(price)
    .replace(" ₫", "") // Có dấu cách đặc biệt trước "₫"
    .trim();
};
const formatPriceToRawNumber = (formattedPrice) => {
  return Number(formattedPrice.replace(/[^\d]/g, ""));
};

export { formatPrice, formatPriceToRawNumber, formatPriceWithoutSymbol };
