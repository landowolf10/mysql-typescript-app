import { Router } from "express";
import { gestUsers, login, createUser } from "../controllers/user.controller";

const router = Router();

router.route('/users').get(gestUsers)
router.route('/users').post(createUser);
router.route('/users/login').post(login);

export default router;