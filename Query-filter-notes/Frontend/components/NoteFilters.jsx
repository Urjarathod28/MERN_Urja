import { useEffect, useState } from "react";
import api from "../src/api";

const NoteFilters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/notes/categories");
        setCategories(["all", ...res.data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex flex-wrap gap-3 mb-6">

      <select
        name="category"
        className="border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={filters.category}
        onChange={handleChange}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Categories" : cat}
          </option>
        ))}
      </select>

      <select
        name="sort"
        className="border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={filters.sort}
        onChange={handleChange}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <input
        type="text"
        name="search"
        placeholder="Search notes..."
        className="border border-gray-300 rounded px-3 py-2 flex-1 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={filters.search}
        onChange={handleChange}
      />
    </div>
  );
};

export default NoteFilters;
