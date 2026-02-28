"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, deleteProduct } from "@/src/features/products/productsSlice";
import { RootState, AppDispatch } from "@/src/store";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        value: Number(value),
      }),
    );
    setName("");
    setValue("");
  }

  function handleDelete(id: number) {
    dispatch(deleteProduct(id));
  }

  return (
    <div>
      <h1>Produtos</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
        <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Valor" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Criar</button>
      </form>

      {loading && <p>Carregando...</p>}

      <ul>
        {items.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.value}
            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: "10px" }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
