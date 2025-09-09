import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";
import orderRoutes from "./order.js";
import paymentRoutes from "./payment.js";


const router = express.Router();





router.use("/vendor/auth", authRoutes);
router.use("/vendor/product", productRoutes);
router.use("/vendor/order", orderRoutes);
router.use("/vendor/payment", paymentRoutes);



export default router;