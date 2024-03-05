export const formatNumber = (number: string | number) => {
  try {
    const numberFormat = number
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return numberFormat;
  } catch (error) {
    return "0";
  }
};
