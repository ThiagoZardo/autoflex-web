"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
}

interface RawMaterial {
  id: number;
  name: string;
}

export default function AssociationsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

  async function fetchProducts() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  }

  async function fetchMaterials() {
    const res = await fetch("http://localhost:3000/raw-materials");
    const data = await res.json();
    setMaterials(data);
  }

  async function handleAssociate(e: any) {
    e.preventDefault();

    await fetch(`http://localhost:3000/products/${selectedProduct}/raw-materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rawMaterialId: Number(selectedMaterial),
        requiredQuantity: Number(requiredQuantity),
      }),
    });

    setSelectedMaterial("");
    setRequiredQuantity("");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold">Associations</h1>

      <form onSubmit={handleAssociate} className="bg-white p-6 rounded-2xl shadow space-y-4">
        <select className="border p-2 rounded-xl w-full" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select className="border p-2 rounded-xl w-full" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
          <option value="">Select Raw Material</option>
          {materials.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Required quantity"
          className="border p-2 rounded-xl w-full"
          value={requiredQuantity}
          onChange={(e) => setRequiredQuantity(e.target.value)}
        />

        <button type="submit" className="bg-black text-white px-6 py-2 rounded-xl cursor-pointer">
          Associate
        </button>
      </form>
    </div>
  );
}
