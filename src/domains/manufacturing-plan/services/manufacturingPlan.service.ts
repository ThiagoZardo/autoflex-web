const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${API_URL}/manufacturing-plan`;

export async function getManufacturingPlan() {
  const res = await fetch(BASE_URL);
  return res.json();
}
