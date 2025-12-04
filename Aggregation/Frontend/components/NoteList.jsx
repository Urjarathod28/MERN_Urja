const NoteList = ({ notes, onDelete }) => {
  if (!notes.length)
    return <p className="text-gray-500 mt-4">No notes available.</p>;

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="border p-4 rounded bg-white shadow"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">
              {note.category}
            </span>
          </div>

          <p className="text-gray-700 mt-2">{note.content}</p>

          <p className="text-xs text-gray-400 mt-2">
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 mt-3 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
