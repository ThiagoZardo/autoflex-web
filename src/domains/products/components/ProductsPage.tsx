"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { createProduct, deleteProduct } from "../services/products.service";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  async function handleCreate(e: any) {
    e.preventDefault();
    await createProduct({
      name,
      value: Number(value),
    });
    setName("");
    setValue("");
    window.location.reload();
  }

  async function handleDelete(id: number) {
    await deleteProduct(id);
    window.location.reload();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold">Products</h1>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="border p-2 rounded-xl flex-1" />

          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="border p-2 rounded-xl w-40" />

          <button type="submit" className="bg-black text-white px-6 rounded-xl cursor-pointer">
            Create
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Value</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">R$ {Number(p.value).toFixed(2)}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
