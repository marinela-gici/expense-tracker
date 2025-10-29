function CategoryList({ categories }) {
  if (!categories.length) return <p>No categories yet.</p>;
  return (
    <div className="categories-list">
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
