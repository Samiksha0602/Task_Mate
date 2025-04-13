function CategoryFilter({ setCategory }) {
  return (
    <select
      className="filter"
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >
      <option value="">All Categories</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Urgent">Urgent</option>
    </select>
  );
}

export default CategoryFilter;
