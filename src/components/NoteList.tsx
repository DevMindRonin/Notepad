import { FC, useState, useRef, useEffect } from "react";
import { Note } from "../types";
import { Button, Form, Table } from "react-bootstrap";

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
    setEditText("");
  };

  return (
    <Table responsive className="mt-5">
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              {isEditing === note.id ? (
                <div className="d-flex justify-content-between align-items-center pe-3">
                  <div className="flex-grow-1">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveClick(note.id);
                      }}
                    >
                      <Form.Control
                        ref={inputRef}
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit note"
                        className="w-100"
                      />
                    </Form>
                  </div>
                  <div>
                    <Button
                      className="ms-2 ps-4 pe-4"
                      variant="outline-success"
                      onClick={() => handleSaveClick(note.id)}
                    >
                      Save
                    </Button>
                    <Button
                      className="ms-2 ps-4 pe-4"
                      variant="outline-primary"
                      onClick={() => setIsEditing(null)}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div>{note.text}</div>
                  <div>
                    <Button
                      className="ms-2 ps-4 pe-4"
                      variant="outline-primary"
                      onClick={() => handleEditClick(note.id, note.text)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="ms-2 ps-3 pe-3"
                      variant="outline-danger"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NoteList;
