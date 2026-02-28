"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../features/products/productsSlice";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>

      {loading && <p>Carregando...</p>}

      <div className="space-y-3">
        {items.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow rounded-lg">
            <strong>{product.name}</strong>
            <p>Valor: R$ {product.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
