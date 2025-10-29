import DeleteIcon from "../assets/icons/DeleteIcon";
import AlertIcon from "../assets/icons/AlertIcon";
import { deleteExpense } from "../services/expenseService";

function ExpenseList({ expenses, onExpenseDeleted }) {
  const handleDelete = async (id) => {
    try {
      const res = await deleteExpense(id);
      if (res.ok) {
        onExpenseDeleted?.(id);
      } else {
        alert(res.error || "Failed to delete expense");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  const grouped = [];
  expenses.forEach((exp) => {
    const categoryName = exp.categoryId?.name || "Uncategorized";
    let group = grouped.find((g) => g.categoryName === categoryName);
    if (!group) {
      group = { categoryName, expenses: [] };
      grouped.push(group);
    }
    group.expenses.push(exp);
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (!expenses.length) return <p>No expenses yet.</p>;

  return (
    <div className="expenses-section">
      {grouped.map((group) => (
        <div key={group.categoryName} className="grouped-expenses">
          <h3>
            {group.categoryName.charAt(0).toUpperCase() +
              group.categoryName.slice(1)}
          </h3>
          <ul className="expenses-list">
            {group.expenses.map((exp) => (
              <li key={exp._id}>
                <div>
                  {exp.description.charAt(0).toUpperCase() +
                    exp.description.slice(1)}
                  : ${exp.amount}
                  <button onClick={() => handleDelete(exp._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Total expenses: ${total}</h2>
      {total > import.meta.env.VITE_BUDGET_LIMIT && (
        <div className="budget-exceeded">
          <AlertIcon />
          <p className="error-text">Budget exceeded!</p>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
