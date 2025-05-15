export const selectFilters = (state) => state.filters;
export const selectFilterBrand = (state) => state.filters.brand;
export const selectFilterPrice = (state) => state.filters.price;
export const selectFilterMileage = (state) => ({
  from: state.filters.mileageFrom,
  to: state.filters.mileageTo,
});
