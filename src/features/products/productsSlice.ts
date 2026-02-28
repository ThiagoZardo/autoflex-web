import { apiFetch } from "@/src/services/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  value: number;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  return await apiFetch("/products");
});

export const createProduct = createAsyncThunk("products/create", async (data: { name: string; value: number }) => {
  return await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
});

export const deleteProduct = createAsyncThunk("products/delete", async (id: number) => {
  await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
  return id;
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
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
