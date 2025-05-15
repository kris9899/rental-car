import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars.items;
export const selectCarsLoading = (state) => state.cars.isLoading;
export const selectCarsError = (state) => state.cars.error;
export const selectSelectedCar = (state) => state.cars.selectedCar;
export const selectTotalPages = (state) => state.cars.totalPages;
