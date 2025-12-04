import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../src/api";
import NoteList from "../components/NoteList";

const AllNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [categoryStats, setCategoryStats] = useState([]);

  const fetchNotes = async () => {
    try {
      const params = {
        fields: "title,category,createdAt",
        page,
        limit,
      };

      const res = await api.get("/notes", { params });
      setNotes(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const res = await api.get("/notes/category-stats");
      setCategoryStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategoryStats();
  }, [page, limit]);

  const updateNote = async (id, payload) => {
    await api.put(`/notes/${id}`, payload);
    fetchNotes();
    fetchCategoryStats();
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    fetchNotes();
    fetchCategoryStats();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">All Notes</h2>
        <Link
          to="/create-note"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
        >
          Create New Note
        </Link>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <label htmlFor="limit" className="text-sm font-medium text-gray-700">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // Reset to first page when limit changes
          }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="max-w-4xl mx-auto mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Category Statistics</h3>
        {categoryStats.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {categoryStats.map((stat) => (
              <li key={stat._id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-pointer transform hover:scale-105 text-base text-gray-800 text-center">
                {stat._id}: {stat.count} notes
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No category statistics available.</p>
        )}
      </div>
      <NoteList notes={notes} onUpdate={updateNote} onDelete={deleteNote} />
      {meta && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {notes.length} of {meta.total} notes
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === meta.totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNotesPage;
