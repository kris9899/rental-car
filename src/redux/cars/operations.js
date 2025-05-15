import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const goitApi = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ brand, price, mileageFrom, mileageTo, page = 1 }, thunkAPI) => {
    try {
      const params = {
        brand,
        rentalPrice: price,
        minMileage: mileageFrom,
        maxMileage: mileageTo,
        page,
        limit: 12,
      };
      const response = await goitApi.get("/cars", { params });
      return { cars: response.data.cars, totalPages: response.data.totalPages };
    } catch (e) {
      toast.error("Failed to fetch cars");
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await goitApi.get(`/cars/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await goitApi.get("/brands");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
