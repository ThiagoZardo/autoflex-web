import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRawMaterials } from "../services/rawMaterials.service";
import { RawMaterial } from "../types";

interface State {
  items: RawMaterial[];
  loading: boolean;
}

const initialState: State = {
  items: [],
  loading: false,
};

export const fetchRawMaterials = createAsyncThunk("rawMaterials/fetch", async () => {
  return await getRawMaterials();
});

const slice = createSlice({
  name: "rawMaterials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default slice.reducer;
