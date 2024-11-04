import { FC, useState, useRef, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { Container, Card, Col, Row } from "react-bootstrap";
import "./App.css";
import {
  fetchNotes,
  createNote,
  deleteNoteById,
  editNoteById,
} from "./services/noteServices";

import { Note } from "./types";

const App: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const addNote = (text: string) => {
    createNote(text).then((newNote) => setNotes([...notes, newNote]));
  };

  const deleteNote = (id: number) => {
    deleteNoteById(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const editNote = (id: number, text: string) => {
    editNoteById(id, text).then(() => {
      setNotes(
        notes.map((note) => (note.id === id ? { ...note, text } : note))
      );
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  return (
    <Container className="my-min-width">
      <Row className="d-flex justify-content-center align-items-center flex-column pt-5 m-5">
        <Col md={12}>
          <Card>
            <Card.Body className="p-5 bg-light">
              <h1>Notepad</h1>
              <div className="mt-4">
                <NoteForm addNote={addNote} inputRef={inputRef} />
              </div>
              <div>
                <NoteList
                  notes={notes}
                  deleteNote={deleteNote}
                  editNote={editNote}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
