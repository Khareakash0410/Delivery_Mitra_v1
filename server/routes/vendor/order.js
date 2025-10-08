import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { allOrder, dispatchOrder, getOrder, updateOrder } from "../../controllers/VendorController.js";



const router = express.Router();



router.use(authenticate);


router.route("/")
   .get(allOrder);

router.route("/:id")
   .get(getOrder)
   .put(updateOrder);

router.put("/dispatchOrder", dispatchOrder);




export default router;