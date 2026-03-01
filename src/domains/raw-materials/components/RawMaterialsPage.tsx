"use client";

import { useState } from "react";
import { useRawMaterials } from "../hooks/useRawMaterials";
import { createRawMaterial, deleteRawMaterial } from "../services/rawMaterials.service";

export default function RawMaterialsPage() {
  const { materials, loading } = useRawMaterials();

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !stock) return;

    await createRawMaterial({
      name,
      stock: Number(stock),
    });

    setName("");
    setStock("");

    window.location.reload(); // depois podemos melhorar isso
  }

  async function handleDelete(id: number) {
    await deleteRawMaterial(id);
    window.location.reload();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold">Raw Materials</h1>

      {/* FORM */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Material name" className="border p-2 rounded-xl flex-1" />

          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" className="border p-2 rounded-xl w-40" />

          <button type="submit" className="bg-black text-white px-6 rounded-xl cursor-pointer">
            Create
          </button>
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            ) : materials.length === 0 ? (
              <tr>
                <td className="p-4">No raw materials found</td>
              </tr>
            ) : (
              materials.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-4">{m.name}</td>
                  <td className="p-4">{m.stock}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 cursor-pointer">
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
