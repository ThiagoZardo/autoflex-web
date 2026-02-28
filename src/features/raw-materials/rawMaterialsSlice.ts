import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "@/src/services/api";

export interface RawMaterial {
  id: number;
  name: string;
  stock: number;
}

interface RawMaterialsState {
  items: RawMaterial[];
  loading: boolean;
  error: string | null;
}

const initialState: RawMaterialsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRawMaterials = createAsyncThunk("rawMaterials/fetchAll", async () => {
  return await apiFetch("/raw-materials");
});

const rawMaterialsSlice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao carregar matérias-primas";
      });
  },
});

export default rawMaterialsSlice.reducer;
