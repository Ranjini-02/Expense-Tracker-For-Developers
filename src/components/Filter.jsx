import React from "react";

function Filter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-row">
      <label htmlFor="category-filter">Filter by Category</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
