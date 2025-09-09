import express from "express";
import adminRoutes from "./admin/index.js";
import authRoutes from "./auth/index.js";
import deliveryAgentRoutes from "./delivery/index.js";
import userRoutes from "./user/index.js";
import vendorRoutes from "./vendor/index.js";


const router = express.Router();

// API v1 Routes ---

router.use("/api/v1", [
    adminRoutes, //  Admin Routes under /api/v1/admin
    authRoutes, // Authentication Routes under /api/v1/auth
    deliveryAgentRoutes, // DeliveryAgent Routes under /api/v1/delivery
    userRoutes, // User Routes under /api/v1/user
    vendorRoutes, // Vendor Routes under /api/v1/vendor
]);



export default router;