import Button from '@mui/material/Button';
import { TextField } from "@mui/material"
import React, { FC, useState, forwardRef, RefObject } from 'react';

interface NoteFormProps {
  addNote: (text: string) => void;
  inputRef: RefObject<HTMLInputElement>; // Ref bude předán přes props
}

const NoteForm: FC<NoteFormProps> = forwardRef(({ addNote, inputRef }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField 
        label="Name" variant="outlined" fullWidth
        ref={inputRef} // Použití ref pro zadávání úkolu
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new note"
      />
      <Button variant="contained" type="submit">Add Note</Button>
    </form>
  );
});

export default NoteForm;