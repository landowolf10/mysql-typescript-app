import { Router } from "express";
import { gestUsers, createUser } from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(gestUsers)
    .post(createUser);

export default router;