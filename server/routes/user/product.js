import express from "express";
import { bestSellingProducts, getFreshProducts, getProducts, getRecommendedProduct, getSingleproduct } from "../../controllers/ProductController.js";


const router = express.Router();


router.get("/:id", getSingleproduct);
router.get("/similiar/:id", getRecommendedProduct);
router.get("/get-all", getProducts);
router.get("/fresh-products", getFreshProducts);
router.get("/best-selling", bestSellingProducts);

export default router;