import client from "./client";

export async function getExpenses() {
  const response = await client.get("/expenses");
  return response.data;
}

export async function createExpense(categoryId, amount, description) {
  const response = await client.post("/expenses", {
    categoryId,
    amount,
    description,
  });
  return response.data;
}

export async function deleteExpense(id) {
  const response = await client.delete(`/expenses/${id}`);
  return response.data;
}
