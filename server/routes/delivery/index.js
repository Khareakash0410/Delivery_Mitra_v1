import express from "express";
import authRoutes from "./auth.js";
import orderRoutes from "./order.js";


const router = express.Router();



router.use("/delivery/auth", authRoutes);
router.use("/delivery/order", orderRoutes);



export default router;