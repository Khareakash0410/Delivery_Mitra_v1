import express from "express";
import {areAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { getAllPaymentsInDay, getDailyPayments } from "../../controllers/VendorController.js";



const router = express.Router();




router.use(authenticate);

router.route("/")
   .get(getDailyPayments);


router.route("/allPaymentsInDay")
   .get(getAllPaymentsInDay);





export default router;