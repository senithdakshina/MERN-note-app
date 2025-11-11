import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote ,getNoteById} from "../controllers/noteControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/",getAllNotes);

// router.post("/",createNote);

// router.put("/:id",updateNote);

// router.delete("/:id",deleteNote);

// router.get("/:id",getNoteById)

router.route("/").get(protect, getAllNotes).post(protect, createNote);
router.route("/:id").get(protect, getNoteById).delete(protect, deleteNote).put(protect, updateNote);


export default router;
