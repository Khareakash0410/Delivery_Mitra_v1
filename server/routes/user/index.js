import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";


const router = express.Router();





router.use("/user/auth", authRoutes);
router.use("/user/product", productRoutes);



export default router;