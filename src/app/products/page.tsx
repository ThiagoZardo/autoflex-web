"use client";

import { Plus, Trash2, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, deleteProduct, Product } from "@/src/features/products/productsSlice";
import { RootState, AppDispatch } from "@/src/store";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.products);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  // Association states
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [associations, setAssociations] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
    fetchRawMaterials();
  }, []);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !value) return;

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

  async function fetchRawMaterials() {
    const res = await fetch("http://localhost:3000/raw-materials");
    const data = await res.json();
    setRawMaterials(data);
  }

  async function fetchAssociations(productId: number) {
    const res = await fetch(`http://localhost:3000/products/${productId}/raw-materials`);
    const data = await res.json();
    setAssociations(data);
  }

  async function handleAddAssociation() {
    if (!selectedMaterial || !requiredQuantity || !selectedProduct) return;

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
    fetchAssociations(selectedProduct);
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <Package size={28} />
          <h1 className="text-4xl font-bold text-gray-900">Produtos</h1>
        </div>
        <p className="text-gray-500 mt-2">Gerencie os pratos disponíveis no sistema.</p>
      </div>

      {/* CARD CRIAR */}
      <div className="bg-white border rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">Novo Produto</h2>

        <form onSubmit={handleCreate} className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-1 min-w-[250px]">
            <label className="text-sm font-medium text-gray-600 mb-1">Nome do Produto</label>
            <input
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Lasanha Bolonhesa"
            />
          </div>

          <div className="flex flex-col w-40">
            <label className="text-sm font-medium text-gray-600 mb-1">Valor (R$)</label>
            <input
              type="number"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition self-end cursor-pointer flex items-center gap-2"
          >
            <Plus size={18} />
            Criar
          </button>
        </form>
      </div>

      {/* LISTAGEM */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Lista de Produtos</h2>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Carregando...</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Nome</th>
                  <th className="text-left px-6 py-4">Valor</th>
                  <th className="text-left px-6 py-4">Ações</th>
                </tr>
              </thead>

              <tbody>
                {items.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-700">R$ {Number(product.value).toFixed(2)}</td>
                    <td className="p-4 text-right space-x-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(product.id);
                          fetchAssociations(product.id);
                        }}
                        className="text-blue-600 cursor-pointer"
                      >
                        Manage Materials
                      </button>

                      <button onClick={() => handleDelete(product.id)} className="text-red-500 cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedProduct && (
              <div className="bg-white p-6 rounded-2xl shadow mt-8 space-y-4">
                <h2 className="text-xl font-semibold">Product Raw Materials</h2>

                <div className="flex flex-col md:flex-row gap-4">
                  <select className="border p-2 rounded-xl flex-1" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                    <option value="">Select material</option>
                    {rawMaterials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Required quantity"
                    className="border p-2 rounded-xl w-full md:w-48"
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(e.target.value)}
                  />
                </div>

                <button onClick={handleAddAssociation} className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer">
                  Add Association
                </button>

                <div className="space-y-2">
                  {associations.map((a) => (
                    <div key={a.id} className="flex justify-between border p-3 rounded-xl">
                      <span>{a.rawMaterialName}</span>
                      <span>Qty: {a.requiredQuantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {!loading && items.length === 0 && <p className="p-6 text-gray-500">Nenhum produto cadastrado.</p>}
      </div>
    </div>
  );
}
