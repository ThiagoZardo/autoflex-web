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

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Produtos</h1>
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

          <button type="submit" className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition self-end cursor-pointer">
            Criar Produto
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
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="text-left px-6 py-4">Nome</th>
                <th className="text-left px-6 py-4">Valor</th>
                <th className="text-right px-6 py-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {items.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700">R$ {Number(product.value).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
                    >
                      {" "}
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && items.length === 0 && <p className="p-6 text-gray-500">Nenhum produto cadastrado.</p>}
      </div>
    </div>
  );
}
