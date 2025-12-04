import { useState } from "react";

const NoteList = ({ notes, onUpdate, onDelete }) => {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (note) => {
    setEditId(note._id);
    setEditForm({
      title: note.title,
      content: note.content,
      category: note.category,
    });
  };

  const handleChange = (e) =>
    setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const saveEdit = (e) => {
    e.preventDefault();
    onUpdate(editId, editForm);
    setEditId(null);
  };

  if (!notes.length)
    return <p className="text-gray-500 mt-5">No notes found.</p>;

  return (
    <div className="space-y-4">
      {notes.map((note) =>
        editId === note._id ? (
          <form
            key={note._id}
            onSubmit={saveEdit}
            className="border rounded p-4 bg-yellow-50"
          >
            <input
              name="title"
              className="border w-full px-2 py-1 mb-2"
              value={editForm.title}
              onChange={handleChange}
            />
            <textarea
              name="content"
              rows="2"
              className="border w-full px-2 py-1 mb-2"
              value={editForm.content}
              onChange={handleChange}
            />
            <select
              name="category"
              className="border px-2 py-1 mb-2"
              value={editForm.category}
              onChange={handleChange}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
              <option>Other</option>
            </select>

            <button className="bg-green-600 text-white px-3 py-1 rounded mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditId(null)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div
            key={note._id}
            className="border rounded p-4 bg-white shadow"
          >
            <div className="flex justify-between mb-1">
              <h3 className="font-semibold">{note.title}</h3>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {note.category}
              </span>
            </div>
            <p className="text-gray-700">{note.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(note.createdAt).toLocaleString()}
            </p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => startEdit(note)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NoteList;
