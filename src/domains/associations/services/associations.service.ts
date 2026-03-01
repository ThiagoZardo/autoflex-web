const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${API_URL}/raw-materials`;

export async function getAssociations() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createAssociation(data: { productId: number; rawMaterialId: number; quantity: number }) {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteAssociation(id: number) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
