import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);

      if (index !== -1) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
