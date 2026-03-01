"use client";

import { useEffect, useState } from "react";
import { getManufacturingPlan } from "../services/manufacturingPlan.service";
import { Suggestion } from "../types";

export function useManufacturingPlan() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getManufacturingPlan();
      setSuggestions(data?.suggestions ?? []);
      setLoading(false);
    }

    load();
  }, []);

  return { suggestions, loading };
}
