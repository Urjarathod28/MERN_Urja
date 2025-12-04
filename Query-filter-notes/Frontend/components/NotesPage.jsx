import { useEffect, useState } from "react";
import api from "../src/api";
import NoteFilters from "./NoteFilters";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";

const NotesPage = () => {
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

  const createNote = async (payload) => {
    await api.post("/notes", payload);
    fetchNotes();
  };

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
      <NoteFilters filters={filters} setFilters={setFilters} />
      <NoteForm onSubmit={createNote} />
      <NoteList notes={notes} onUpdate={updateNote} onDelete={deleteNote} />
      {meta && (
        <p className="mt-3 text-sm text-gray-500">
          Showing {notes.length} of {meta.total} notes
        </p>
      )}
    </div>
  );
};

export default NotesPage;
