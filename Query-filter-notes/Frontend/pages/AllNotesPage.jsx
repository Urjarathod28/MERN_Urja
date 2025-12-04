import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../src/api";
import NoteFilters from "../components/NoteFilters";
import NoteList from "../components/NoteList";

const AllNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [meta, setMeta] = useState(null);

  const [filters, setFilters] = useState({
    category: "all",
    sort: "desc",
    search: "",
  });

  const fetchNotes = async () => {
    try {
      const params = {
        ...filters,
        fields: "title,category,createdAt",
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
  }, [filters]);

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
      <NoteFilters filters={filters} setFilters={setFilters} />
      <NoteList notes={notes} onUpdate={updateNote} onDelete={deleteNote} />
      {meta && (
        <p className="mt-3 text-sm text-gray-500">
          Showing {notes.length} of {meta.total} notes
        </p>
      )}
    </div>
  );
};

export default AllNotesPage;
