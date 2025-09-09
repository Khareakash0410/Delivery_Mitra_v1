import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { addVendor, getAllVendor, getSingleVendor } from "../../controllers/AdminController.js";

const router = express.Router();






router.use(authenticate);

router.route("/")
   .get(getAllVendor)
   .post(addVendor);


router.route("/:id")
   .get(getSingleVendor);






export default router;