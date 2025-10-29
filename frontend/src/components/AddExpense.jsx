import { useState } from "react";
import { createExpense } from "../services/expenseService";

function AddExpense({ categories, onExpenseAdded }) {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!categoryId) newErrors.categoryId = "Please select a category";
    if (!amount) newErrors.amount = "Amount is required";
    else if (parseFloat(amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      const res = await createExpense(
        categoryId,
        parseFloat(amount),
        description
      );

      if (res.ok) {
        onExpenseAdded?.(res.data);
        setCategoryId("");
        setAmount("");
        setDescription("");
      } else {
        setErrors({ global: res.error || "Failed to create expense" });
      }
    } catch (err) {
      setErrors({ global: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="error-text">{errors.categoryId}</p>}
      </div>

      <div>
        <label>Amount: </label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p className="error-text">{errors.amount}</p>}
      </div>

      <div>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p className="error-text">{errors.description}</p>
        )}
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Adding..." : "Add Expense"}
      </button>

      {errors.global && <p className="error-text">{errors.global}</p>}
    </form>
  );
}

export default AddExpense;
