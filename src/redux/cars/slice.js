import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./operations";

const initialState = {
  items: [],
  selectedCar: null,
  isLoading: false,
  error: null,
  totalPages: 1,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    resetCars(state) {
      state.items = [];
      state.totalPages = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items =
          action.meta.arg.page === 1
            ? action.payload.cars
            : [...state.items, ...action.payload.cars];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload;

        state.selectedCar = {
          ...payload,
          year: payload.year || payload.yea,
        };
      })

      .addCase(fetchCarById.rejected, (state) => {
        state.isLoading = false;
        state.selectedCar = null;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
