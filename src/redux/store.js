import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../redux/cars/slice";
import brandsReducer from "../redux/brands/slice";
import filtersReducer from "../redux/filters/slice";
import favoritesReducer from "../redux/favorite/slice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});
