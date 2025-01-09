import express from "express";
const router = express.Router();

import { login, register, logout } from "../controller/auth.js";

router.route('/login')
    .post(login)

router.route('/register')
    .post(register)

router.route('/logout')
    .post(logout)

// router.get("/me", protectRoute ,getMe);

export default router;