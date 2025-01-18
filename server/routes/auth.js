import express from "express"
import { signUp, logIn, logOut, googleSignIn } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.post("/google", googleSignIn);

export default router;