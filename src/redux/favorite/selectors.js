export const selectFavoriteIds = (state) => state.favorites.ids;

export const selectFavoriteCars = (state) => {
  const allCars = state.cars.items;
  const favIds = state.favorites.ids;
  return allCars.filter((car) => favIds.includes(car.id));
};
