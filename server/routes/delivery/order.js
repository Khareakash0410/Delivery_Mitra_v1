import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { getAndAcceptOrder, getAvailableOrder, } from "../../controllers/DeliveryAgentController.js";


const router = express.Router();




router.use(authenticate);


router.route("/")
   .get(getAvailableOrder)


router.route("/:id")
   .put(getAndAcceptOrder)


router.put




export default router;