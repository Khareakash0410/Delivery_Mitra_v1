import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";


const router = express.Router();



router.use(authenticate);

router.route("/")
   .get(getAllAgent)
   .post(addDeliveryAgent);

router.route("/:id")
   .get(getSingleAgent);







export default router;