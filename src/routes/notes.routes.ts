import { Router } from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/note.controller";

const router = Router();

router.route('/')
    .post(createNote)
    .put(updateNote);

router.route('/:noteID')
    .delete(deleteNote);

router.route('/:userID')
    .get(getNotes);

export default router;