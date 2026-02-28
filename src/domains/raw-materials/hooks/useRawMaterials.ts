import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRawMaterials } from "../store/rawMaterialsSlice";
import { RootState, AppDispatch } from "@/src/store";

export function useRawMaterials() {
  const dispatch = useDispatch<AppDispatch>();
  const materials = useSelector((state: RootState) => state.rawMaterials.items);
  const loading = useSelector((state: RootState) => state.rawMaterials.loading);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  return { materials, loading };
}
