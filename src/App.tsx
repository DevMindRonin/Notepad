import { Typography, Container, Grid2, Box } from "@mui/material"
import { FC, useState, useRef, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { 
  fetchNotes, 
  createNote, 
  deleteNoteById, 
  editNoteById 
} from './services/noteServices';
import { Note } from './types';

const App: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const inputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const addNote = (text: string) => {
    createNote(text).then(newNote => setNotes([...notes, newNote]));
  };

  const deleteNote = (id: number) => {
    deleteNoteById(id).then(() => {
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  const editNote = (id: number, text: string) => {
    editNoteById(id, text).then(() => {
      setNotes(notes.map(note => note.id === id ? { ...note, text } : note));
      if (inputRef.current) {
        inputRef.current.focus(); 
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Notes</Typography>
      <Grid2
        container
        justifyContent="center"  
        alignItems="center"      
        style={{ minHeight: '100vh' }} 
      >
      <NoteForm addNote={addNote} inputRef={inputRef} />
      <NoteList 
        notes={notes} 
        deleteNote={deleteNote} 
        editNote={editNote}
      />
      </Grid2>
    </Container>
  );
};

export default App;
