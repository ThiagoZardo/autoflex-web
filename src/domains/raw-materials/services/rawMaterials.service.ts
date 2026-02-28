const BASE_URL = "http://localhost:3000/raw-materials";

export async function getRawMaterials() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createRawMaterial(data: { name: string; stock: number }) {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteRawMaterial(id: number) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
