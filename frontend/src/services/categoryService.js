import client from "./client";

export async function getCategories() {
  const response = await client.get("/categories");
  return response.data;
}

export async function createCategory(name) {
  const response = await client.post("/categories", { name });
  return response.data;
}
