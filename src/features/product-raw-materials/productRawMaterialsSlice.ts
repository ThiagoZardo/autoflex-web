import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "@/src/services/api";

export interface ProductRawMaterial {
  id: number;
  quantityRequired: number;
  product: {
    id: number;
    name: string;
  };
  rawMaterial: {
    id: number;
    name: string;
  };
}

interface ProductRawMaterialsState {
  items: ProductRawMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductRawMaterialsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProductRawMaterials = createAsyncThunk("productRawMaterials/fetchAll", async () => {
  return await apiFetch("/associations");
});

const productRawMaterialsSlice = createSlice({
  name: "productRawMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductRawMaterials.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar associações";
      });
  },
});

export default productRawMaterialsSlice.reducer;
