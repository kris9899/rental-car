export const formatMileage = (km) =>
  `${new Intl.NumberFormat("uk-UA").format(km)} km`;
