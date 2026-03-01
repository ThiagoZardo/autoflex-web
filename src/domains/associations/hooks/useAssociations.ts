"use client";

import { useEffect, useState } from "react";
import { getAssociations, createAssociation, deleteAssociation } from "../services/associations.service";
import { Association } from "../types";

export function useAssociations() {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getAssociations();
    setAssociations(data.associations ?? []);
    setLoading(false);
  }

  async function create(data: { productId: number; rawMaterialId: number; quantity: number }) {
    await createAssociation(data);
    await load();
  }

  async function remove(id: number) {
    await deleteAssociation(id);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return { associations, loading, create, remove };
}
