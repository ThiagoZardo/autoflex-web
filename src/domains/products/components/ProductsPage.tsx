"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { createProduct, deleteProduct } from "../services/products.service";
import { Package, Plus, Trash2 } from "lucide-react";

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
      <div className="flex items-center gap-3">
        <Package size={28} />
        <h1 className="text-4xl font-bold text-gray-900">Produtos</h1>
      </div>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="border p-2 rounded-xl flex-1" />

          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" className="border p-2 rounded-xl w-40" />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition self-end cursor-pointer flex items-center gap-2"
          >
            <Plus size={18} />
            Criar
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
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition cursor-pointer flex items-center justify-end gap-2"
                    >
                      <Trash2 size={16} />
                      Excluir
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
