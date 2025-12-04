import { useNavigate } from "react-router-dom";
import api from "../src/api";
import NoteForm from "../components/NoteForm";

const CreateNotePage = () => {
  const navigate = useNavigate();

  const createNote = async (payload) => {
    try {
      await api.post("/notes", payload);
      navigate("/notes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Create New Note</h2>
      <NoteForm onSubmit={createNote} />
    </div>
  );
};

export default CreateNotePage;
