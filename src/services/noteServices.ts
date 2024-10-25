// services/noteService.ts
import { Note } from "../types";

export const createNote = async (text: string): Promise<Note> => {
  const response = await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch("http://localhost:5000/api/notes");
  return response.json();
};

export const editNoteById = async (id: number, text: string): Promise<Note> => {
  const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const deleteNoteById = async (id: number): Promise<void> => {
  await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: "DELETE",
  });
};
