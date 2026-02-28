import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import rawMaterialsReducer from "@/src/features/raw-materials/rawMaterialsSlice";
import productRawMaterialsReducer from "@/src/features/product-raw-materials/productRawMaterialsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    rawMaterials: rawMaterialsReducer,
    productRawMaterials: productRawMaterialsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
