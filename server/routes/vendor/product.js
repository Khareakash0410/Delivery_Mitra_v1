import express from "express";
import {areAuthenticated as authenticate} from "../../middleware/Authenticate.js";
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "../../controllers/VendorController.js";


const router = express.Router();




router.use(authenticate);


router.route("/")
   .get(allProducts)
   .post(addProduct);



router.route("/:id")
   .get(getProduct)
   .put(updateProduct)
   .delete(deleteProduct);


export default router;