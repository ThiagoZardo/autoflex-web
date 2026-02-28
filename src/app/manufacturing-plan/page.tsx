"use client";

import { useEffect, useState } from "react";
import { Factory } from "lucide-react";

interface Suggestion {
  productId: number;
  productName: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
}

interface ProductionPlan {
  suggestions: Suggestion[];
  totalProductionValue: number;
}

export default function ManufacturingPlanPage() {
  const [plan, setPlan] = useState<ProductionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlan();
  }, []);

  async function fetchPlan() {
    try {
      const res = await fetch("http://localhost:3000/production-plan");
      const data = await res.json();

      // garante estrutura segura
      setPlan({
        suggestions: data.suggestions ?? [],
        totalProductionValue: data.totalProductionValue ?? 0,
      });
    } catch (error) {
      console.error(error);
      setPlan({
        suggestions: [],
        totalProductionValue: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex gap-3 items-center">
        <Factory size={28} />
        <h1 className="text-4xl font-bold">Manufacturing Plan</h1>
      </div>

      {plan && plan.suggestions.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow text-center">No products can be produced with current stock.</div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="min-w-full">
              {" "}
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Unit Value</th>
                  <th className="p-4">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {plan?.suggestions?.map((s) => (
                  <tr key={s.productId} className="border-t">
                    <td className="p-4">{s.productName}</td>
                    <td className="p-4">{s.quantity}</td>
                    <td className="p-4">R$ {Number(s.unitValue).toFixed(2)}</td>
                    <td className="p-4 font-semibold">R$ {Number(s.totalValue).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-2xl font-bold">Total Production Value: R$ {Number(plan?.totalProductionValue).toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
