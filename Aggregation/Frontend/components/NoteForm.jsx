import { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Work",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("All fields required");
    onSubmit(form);
    setForm({ title: "", content: "", category: "Work" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg p-5 mb-6 bg-white shadow hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold mb-4 text-black">Create Note</h3>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-gray-300 rounded w-full px-3 py-2 mb-3 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="content"
        placeholder="Content"
        rows="3"
        className="border border-gray-300 rounded w-full px-3 py-2 mb-3 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={form.content}
        onChange={handleChange}
      />

      <select
        name="category"
        className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200"
        value={form.category}
        onChange={handleChange}
      >
        <option>Work</option>
        <option>Personal</option>
        <option>Study</option>
        <option>Other</option>
      </select>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
