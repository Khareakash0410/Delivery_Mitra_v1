import express from "express";
import {isAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { addProduct, allProducts, deleteProduct, getAllCategories, getProduct, updateProduct } from "../../controllers/VendorController.js";


const router = express.Router();




router.route("/all-category")
   .get(getAllCategories);

router.use(authenticate);


router.route("/")
   .get(allProducts)
   .post(addProduct);



router.route("/:id")
   .get(getProduct)
   .put(updateProduct)
   .delete(deleteProduct);


export default router;