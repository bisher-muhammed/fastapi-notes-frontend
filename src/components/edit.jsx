import { useEffect, useState } from "react";
import api from "@/utils/api";

const EditNote = ({ noteId, closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const fetchNote = async () => {
    try {
      const response = await api.get(`/notes/${noteId}`);
      setTitle(response.data.note_title);
      setContent(response.data.note_content);
    } catch (err) {
      setError("Failed to load note.");
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      await api.put(`/notes/${noteId}`, {
        note_title: title,
        note_content: content,
      });
      closeModal(); // go back to home
    } catch (err) {
      setError("Failed to update note.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      setIsSubmitting(true);
      await api.delete(`/notes/${noteId}`);
      closeModal(); // go back to home
    } catch (err) {
      setError("Failed to delete note.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#f8f3e0] border border-yellow-200 rounded shadow-lg">
      <div className="bg-orange-300 p-2 rounded-t flex justify-between items-center">
        <div className="text-sm font-medium">Edit Note</div>
        <button
          className="text-gray-700 hover:text-gray-900 text-lg font-bold"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="p-4"
      >
        {error && (
          <div className="mb-4 p-2 bg-orange-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm h-32"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={1000}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
            disabled={isSubmitting}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
