import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { logout } from "../../controllers/AuthController.js";
import multer from "multer";
import { uploadSingleFile } from "../../controllers/uploadController.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


// router.post("/get-latest-token", getLatestToken);

router.get("/logout", authenticate, logout);
router.post("/upload", upload.single("image"), uploadSingleFile);


export default router;