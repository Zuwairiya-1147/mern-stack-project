import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {getProducts, createProduct, updateProduct, deleteProduct} from '../contollers/product.contoller.js';

const router = express.Router();

router.get("/", protectRoute, getProducts);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute,updateProduct);
router.delete("/:id", protectRoute,deleteProduct);


export default router;