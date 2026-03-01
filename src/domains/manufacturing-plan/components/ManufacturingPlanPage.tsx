"use client";

import { useManufacturingPlan } from "../hooks/useManufacturingPlan";

export default function ManufacturingPlanPage() {
  const { suggestions, loading } = useManufacturingPlan();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Manufacturing Plan</h1>

      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Quantity to Produce</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4">Loading...</td>
              </tr>
            ) : suggestions.length === 0 ? (
              <tr>
                <td className="p-4">Nothing to produce</td>
              </tr>
            ) : (
              suggestions.map((s) => (
                <tr key={s.productId} className="border-t">
                  <td className="p-4">{s.productName}</td>
                  <td className="p-4">{s.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
