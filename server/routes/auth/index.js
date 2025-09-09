import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { logout } from "../../controllers/AuthController.js";



const router = express.Router();

router.post("/get-latest-token", getLatestToken);

router.post("/logout", authenticate, logout);



export default router;