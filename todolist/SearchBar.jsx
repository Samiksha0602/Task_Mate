function SearchBar({ setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      className="search"
      onChange={(e) =>
        setSearchQuery(
          e.target.value.toLowerCase()
        )
      }
    />
  );
}

export default SearchBar;
