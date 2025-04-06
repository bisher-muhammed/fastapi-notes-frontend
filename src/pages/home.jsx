import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/Header";
import CreateNote from "@/components/createNote";
import NotePage from "@/components/notes";
import EditNote from "@/components/edit";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null); // selected note to edit

  const openCreateModal = () => {
    setEditNoteId(null); // close edit mode if it was open
    setIsModalOpen(true);
  };

  const handleEditNote = (noteId) => {
    setEditNoteId(noteId); // trigger EditNote
    setIsModalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-[#f8f3e0] relative ${isModalOpen ? "opacity-70" : ""}`}>
      <Header />

      <div className="p-4 text-sm text-[#d48277]">
        <span>Homepage</span> / <span>My Notes</span>
      </div>

      <h2 className="text-4xl text-[#333333] font-extrabold mb-4 my-7 mx-8">
        Good Morning {user?.user_name || "User"}!
      </h2>

      <button
        onClick={openCreateModal}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <span className="text-2xl">+</span>
      </button>

      <NotePage onEditNote={handleEditNote} />

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-xl p-6 relative max-w-2xl w-full">
              {editNoteId ? (
                <EditNote noteId={editNoteId} closeModal={() => setIsModalOpen(false)} />
              ) : (
                <CreateNote setIsModalOpen={setIsModalOpen} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
