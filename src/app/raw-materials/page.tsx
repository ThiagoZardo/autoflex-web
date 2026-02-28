"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/store";
import { fetchRawMaterials } from "@/src/features/raw-materials/rawMaterialsSlice";

export default function RawMaterialsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.rawMaterials);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {" "}
      <h1>Raw Materials</h1>
      <ul>
        {items.map((rm) => (
          <li key={rm.id}>
            {rm.name} - Estoque: {rm.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
