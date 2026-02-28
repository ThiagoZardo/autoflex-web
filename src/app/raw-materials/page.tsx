"use client";

import { useEffect, useState } from "react";
import { Package, Plus, Trash2 } from "lucide-react";

interface RawMaterial {
  id: number;
  name: string;
  quantity: number;
}

export default function RawMaterialsPage() {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    const res = await fetch("http://localhost:3000/raw-materials");
    const data = await res.json();
    setMaterials(data);
  }

  async function handleCreate(e: any) {
    e.preventDefault();

    await fetch("http://localhost:3000/raw-materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
      }),
    });

    setName("");
    setQuantity("");
    fetchMaterials();
  }

  async function handleDelete(id: number) {
    await fetch(`http://localhost:3000/raw-materials/${id}`, {
      method: "DELETE",
    });
    fetchMaterials();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex items-center gap-3">
        <Package size={28} />
        <h1 className="text-4xl font-bold">Raw Materials</h1>
      </div>

      {/* CREATE */}
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <input placeholder="Material name" className="border p-2 rounded-xl flex-1" value={name} onChange={(e) => setName(e.target.value)} />

          <input
            type="number"
            placeholder="Stock quantity"
            className="border p-2 rounded-xl w-full md:w-48"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button type="submit" className="bg-black text-white px-6 rounded-xl flex items-center gap-2 cursor-pointer">
            <Plus size={18} />
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
            {materials.map((m) => (
              <tr key={m.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{m.name}</td>
                <td className="p-4">{m.quantity}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(m.id)} className="text-red-500 flex items-center gap-2 justify-end cursor-pointer">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
