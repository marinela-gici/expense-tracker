import { useEffect, useState } from "react";
import "./App.css";
import AddCategory from "./components/AddCategory";
import AddExpense from "./components/AddExpense";
import CategoryList from "./components/CategoryList";
import ExpenseList from "./components/ExpenseList";
import { getCategories } from "./services/categoryService";
import { getExpenses } from "./services/expenseService";

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [catRes, expRes] = await Promise.all([
        getCategories(),
        getExpenses(),
      ]);

      if (!catRes.ok)
        throw new Error(catRes.error || "Failed to fetch categories");
      if (!expRes.ok)
        throw new Error(expRes.error || "Failed to fetch expenses");

      setCategories(catRes.data);
      setExpenses(expRes.data);
    } catch (err) {
      console.error('errr',err);
      setError(err.message || "Something went wrong while loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const handleExpenseDeleted = (id) => {
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  };

  if (loading) return <p>Loading data...</p>;
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center" }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={loadData}>Retry</button>
      </div>
    );

  return (
    <>
      <h2>Budget Limit: ${import.meta.env.VITE_BUDGET_LIMIT || 1000}</h2>
      <div className="main-section">
        <div className="card">
          <h2>Categories</h2>
          <AddCategory onCategoryAdded={handleCategoryAdded} />
          <CategoryList categories={categories} />
        </div>

        <div className="card">
          <h2>Expenses</h2>
          <AddExpense
            categories={categories}
            onExpenseAdded={handleExpenseAdded}
          />
        </div>

        <div className="card">
          <h2>Summary</h2>
          <ExpenseList
            expenses={expenses}
            onExpenseDeleted={handleExpenseDeleted}
          />
        </div>
      </div>
    </>
  );
}

export default App;
