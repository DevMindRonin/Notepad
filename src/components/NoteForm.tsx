import React, { FC, useState, forwardRef, RefObject } from "react";
import { Button, Form } from "react-bootstrap";

interface NoteFormProps {
  addNote: (text: string) => void;
  inputRef: RefObject<HTMLInputElement>;
}

const NoteForm: FC<NoteFormProps> = forwardRef(({ addNote, inputRef }) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new note"
        className="form-content"
      />
      <div>
        <Button type="submit" variant="success" className="mt-3">
          Add Note
        </Button>
      </div>
    </Form>
  );
});

export default NoteForm;
