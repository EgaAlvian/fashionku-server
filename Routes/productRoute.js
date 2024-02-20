import "dotenv/config";
import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createProduct,
  deleteProduct,
  getAllProductsByFilter,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/product", upload.single("file"), createProduct);
router.get("/product", getAllProductsByFilter);
router.get("/product/:id", getProductById);
router.put("/product/:id", upload.single("file"), updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
