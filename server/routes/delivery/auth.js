import express from "express";
import {areAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { getProfile, loginDeliveryPartner, updateDeliveryPartnerStatus, updatePassword, updateProfile } from "../../controllers/DeliveryAgentController.js";




const router = express.Router();



router.post("/login", loginDeliveryPartner);

router.use(authenticate);



router.route("/")
   .get(getProfile)
   .put(updateProfile);


router.route("/password")
   .put(updatePassword);


router.route("/deliveryPartner-status")
   .put(updateDeliveryPartnerStatus);




export default router;