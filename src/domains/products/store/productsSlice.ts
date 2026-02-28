import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../services/products.service";
import { Product } from "../types/types";

interface ProductsState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await getProducts();
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
