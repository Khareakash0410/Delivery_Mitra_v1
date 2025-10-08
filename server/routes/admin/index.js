import express from "express";
import authRoutes from "./auth.js"
import vendorRoutes from "./vendor.js"
import deliveryAgentRoutes from "./deliveryAgent.js"
import userRoutes from "./user.js"



const router = express.Router();




router.use("/admin/auth", authRoutes);
router.use("/admin/vendors", vendorRoutes);
router.use("/admin/delivery-agent", deliveryAgentRoutes);
router.use("/admin/user", userRoutes);





export default router;