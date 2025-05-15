import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "../cars/operations";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        (state.isLoading = false), (state.list = action.payload);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      });
  },
});

export default brandSlice.reducer;
