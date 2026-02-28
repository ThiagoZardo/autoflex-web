"use client";

import { apiFetch } from "@/src/services/api";
import { useState } from "react";

export default function ManufacturingPlanPage() {
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleCheck() {
    const data = await apiFetch(`/manufacturing-plan/${productId}`);
    setResult(data);
  }

  return (
    <div>
      <h1>Manufacturing Plan</h1>

      <input placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />

      <button onClick={handleCheck}>Consultar</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
