import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/src/domains/products/store/productsSlice";
import rawMaterialsReducer from "@/src/domains/raw-materials/store/rawMaterialsSlice";
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
