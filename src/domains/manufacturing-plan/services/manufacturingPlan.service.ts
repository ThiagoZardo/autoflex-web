const BASE_URL = "http://localhost:3000/manufacturing-plan"

export async function getManufacturingPlan() {
  const res = await fetch(BASE_URL)
  return res.json()
}