import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";

const CreateNote = ({ setIsModalOpen }) => {
  const router = useRouter();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log('tokenssssss',token)
    if (!token) {
      router.push("/login");
      return;
    }

    // Validate length (optional, based on your requirements)
    if (noteTitle.length > 100 || noteContent.length > 1000) {
      setError("Note title or content is too long.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post("/notes/create", {
        note_title: noteTitle,
        note_content: noteContent,
      });

      if (response.status === 201) {
        setSuccess("Note created successfully!");
        setNoteTitle("");
        setNoteContent("");

        // Wait a bit to let the user see the success message
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
    } catch (err) {
      const message =
        err.response?.data?.detail || "Failed to create note. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto bg-[#f8f3e0] border border-yellow-200 rounded shadow-lg">
      <div className="bg-orange-300 p-2 rounded-t flex justify-between items-center">
        <div className="text-sm font-medium">Add Notes</div>
        <button
          className="text-gray-700 hover:text-gray-900 text-lg font-bold"
          onClick={handleCancel}
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        {error && (
          <div className="mb-4 p-2 bg-orange-300 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div className="mb-4">
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm h-32"
            placeholder="Note content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
            maxLength={1000}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
