import { Router } from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/products", addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);

export default router;
