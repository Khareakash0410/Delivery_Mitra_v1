import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { addCategory, getAllUser } from "../../controllers/AdminController.js";


const router = express.Router();



router.use(authenticate);

router.route("/")
   .get(getAllUser)

router.route("/add-category")
   .post(addCategory);


export default router;