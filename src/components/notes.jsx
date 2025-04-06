import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import Link from "next/link";

const NotePage = ({ onEditNote }) => {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await api.get("/notes");
          setNotes(response.data);
        } catch (error) {
          console.error("error fetching notes:", error);
          setError("Failed to fetch notes");
        }
      };
      fetchNotes();
    }, []);
  
    return (
      <div className="max-w-4xl mx-auto p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {notes.length === 0 ? (
          <p className="text-center text-gray-600">No notes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div
                key={note.note_id}
                className="border border-amber-950 rounded-lg overflow-hidden shadow"
                style={{ maxWidth: "320px" }}
              >
                <div className="bg-orange-300 p-2 flex justify-between items-center">
                  <h3 className="text-amber-800 font-medium">{note.note_title}</h3>
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>
  
                <div
                  onClick={() => onEditNote(note.note_id)}
                  className="bg-amber-50 p-4 flex flex-col cursor-pointer hover:bg-yellow-100 transition"
                >
                  <p className="text-amber-800 py-2 flex-grow">{note.note_content}</p>
                  <div className="text-xs text-gray-500 text-right mt-2">
                    Last Modified:{" "}
                    {new Date(note.last_update).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default NotePage;