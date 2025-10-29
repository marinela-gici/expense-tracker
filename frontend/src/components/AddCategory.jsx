import { useState } from "react";
import { createCategory } from "../services/categoryService";

function AddCategory({ onCategoryAdded }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return setError("Category name is required");

    try {
      setLoading(true);
      setError("");

      const res = await createCategory(name.trim());
      if (res.ok) {
        onCategoryAdded?.(res.data);
        setName("");
      } else {
        setError(res.error || "Failed to create category");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category">
      <input
        type="text"
        placeholder="Add Category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleAdd} disabled={loading} className="submit-button">
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default AddCategory;
