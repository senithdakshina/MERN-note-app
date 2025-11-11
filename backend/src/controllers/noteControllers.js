// FILE: backend/src/controllers/noteControllers.js
import Note from "../models/Note.js";

/**
 * Fetch all notes belonging to the logged-in user
 */
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Create a note for the logged-in user
 */
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      userId: req.user.userId, // associate note with the authenticated user
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Update a note owned by the logged-in user
 */
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Delete a note owned by the logged-in user
 */
export async function deleteNote(req, res) {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get a single note by ID, only if it belongs to the logged-in user
 */
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
