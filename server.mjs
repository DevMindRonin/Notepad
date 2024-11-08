// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

let notes = [
  {
    id: 4564657894536415,
    text: "Vacuum the car",
  },
  {
    id: 56566568453664153,
    text: "Walk the dog",
  },
  {
    id: 5665684553664563,
    text: "Shop for sunday",
  },
];

app.use(express.json());
app.use(cors());

// Get all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Add a new note
app.post("/api/notes", (req, res) => {
  const newNote = { id: Date.now(), text: req.body.text };
  notes.push(newNote);
  res.json(newNote);
});

// Update a note
app.put("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedText = req.body.text;

  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].text = updatedText;
    res.json({ success: true, updatedNote: notes[noteIndex] });
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

// Delete a note
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((note) => note.id !== parseInt(req.params.id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
