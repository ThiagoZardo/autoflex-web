"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRawMaterials } from "@/src/features/product-raw-materials/productRawMaterialsSlice";
import { RootState, AppDispatch } from "@/src/store";

export default function ProductRawMaterialsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector(
    (state: RootState) => state.productRawMaterials
  );

  useEffect(() => {
    dispatch(fetchProductRawMaterials());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Product Raw Materials</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Produto: {item.product.name} → Matéria-prima: {item.rawMaterial.name} (Qtd: {item.quantityRequired})
          </li>
        ))}
      </ul>
    </div>
  );
}