"use client";

import { Trash2 } from "lucide-react";
import { useAssociations } from "../hooks/useAssociations";
import { deleteAssociation } from "../services/associations.service";

export default function AssociationsPage() {
  const { associations, loading, remove } = useAssociations();

  async function handleDelete(id: number) {
    await deleteAssociation(id);
    window.location.reload();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Associations</h1>

      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Raw Material</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            ) : associations.length === 0 ? (
              <tr>
                <td className="p-4">No associations found</td>
              </tr>
            ) : (
              associations.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-4">{a.productName ?? a.productId}</td>
                  <td className="p-4">{a.rawMaterialName ?? a.rawMaterialId}</td>
                  <td className="p-4">{a.quantity}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(a.id)}
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
