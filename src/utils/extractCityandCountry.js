export const exctractCityandCountry = (address) => {
  if (!address) return "";
  const parts = address.split(",").map((part) => part.trim());
  const city = parts[parts.length - 2] || "";
  const country = parts[parts.length - 1] || "";
  return `${city}, ${country}`;
};
