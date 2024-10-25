import Button from "@mui/material/Button";
import { FC, useState, useRef, useEffect } from "react";
import { Note } from "../types";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: number) => void;
  editNote: (id: number, text: string) => void;
}

const NoteList: FC<NoteListProps> = ({ notes, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (id: number, currentText: string) => {
    setIsEditing(id);
    setEditText(currentText);
  };

  const handleSaveClick = (id: number) => {
    editNote(id, editText);
    setIsEditing(null);
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {isEditing === note.id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveClick(note.id);
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Edit note"
              />
              <Button variant="contained" type="submit">
                Save
              </Button>
            </form>
          ) : (
            <>
              {note.text}
              <Button
                variant="contained"
                onClick={() => handleEditClick(note.id, note.text)}
              >
                Edit
              </Button>
              <Button variant="contained" onClick={() => deleteNote(note.id)}>
                Delete
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
