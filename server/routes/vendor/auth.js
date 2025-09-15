import express from "express";
import { getVendorProfile, loginVendor, updateStoreStatus, updateVendorPassword, updateVendorProfile } from "../../controllers/VendorController.js";
import {areAuthenticated as authenticate} from "../../middleware/Authenticate.js";



const router = express.Router();



router.post("/login", loginVendor);


router.use(authenticate);


router.route("/")
   .get(getVendorProfile)
   .put(updateVendorProfile);

router.route("/password")
   .put(updateVendorPassword);

router.route("/store-status")
   .put(updateStoreStatus);




export default router;