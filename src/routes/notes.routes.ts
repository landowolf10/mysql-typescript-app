import { Router } from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/note.controller";

const router = Router();

router.route('/notes/:userID').get(getNotes);
router.route('/notes').post(createNote)
router.route('/notes').put(updateNote);
router.route('/notes/:noteID').delete(deleteNote);

export default router;