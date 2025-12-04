import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../src/api";
import NoteList from "../components/NoteList";

const AllNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);



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

  useEffect(() => {
    fetchNotes();
  }, [page, limit]);

  const updateNote = async (id, payload) => {
    await api.put(`/notes/${id}`, payload);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    fetchNotes();
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
