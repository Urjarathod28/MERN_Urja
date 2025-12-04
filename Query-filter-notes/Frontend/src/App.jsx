import { Routes, Route } from "react-router-dom";
import AllNotesPage from "../pages/AllNotesPage";
import CreateNotePage from "../pages/CreateNotePage";

const App = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black hover:text-gray-800 transition-colors duration-300">Notes App</h1>
      <Routes>
        <Route path="/" element={<AllNotesPage />} />
        <Route path="/notes" element={<AllNotesPage />} />
        <Route path="/create-note" element={<CreateNotePage />} />
      </Routes>
    </div>
  );
};

export default App;
