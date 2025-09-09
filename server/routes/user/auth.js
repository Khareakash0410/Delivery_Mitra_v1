import express from "express";
import { getUser, getUserOrders, loginOtpVerify, updateUser, userLogin, userRegistration, verifyOtp } from "../../controllers/UserController.js";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";


const router = express.Router();


// Open Auth Routes ----
router.post("/register", userRegistration);
router.post("/verify-otp", verifyOtp);
router.post("/login", userLogin);
router.post("/login-otp-verify", loginOtpVerify);


// User Profile with Authenticated ---
router.use(authenticate);

router.get("/me", getUser);
router.put("/update", updateUser);
router.get("/orders", getUserOrders);


export default router;