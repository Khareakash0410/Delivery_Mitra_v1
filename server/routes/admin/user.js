import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { getAllUser } from "../../controllers/AdminController.js";


const router = express.Router();



router.use(authenticate);

router.route("/")
   .get(getAllUser)



export default router;