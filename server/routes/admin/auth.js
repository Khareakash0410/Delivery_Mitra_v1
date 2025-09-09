import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { addAdmin, adminProfile, getAllAdmin, loginAdmin, updatePassword, updateProfile } from "../../controllers/AdminController.js";


const router = express.Router();



router.post("/login", loginAdmin);

router.use(authenticate);

router.route("/")
   .get(adminProfile)
   .post(addAdmin)
   .put(updateProfile);

router.route("/get")
   .get(getAllAdmin)
   .put(updatePassword);





export default router;