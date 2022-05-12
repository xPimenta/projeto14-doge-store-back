import { Router } from "express";
import { getProducts } from "../controllers/productController.js";

const productRouter = Router();
productRouter.get("/products", getProducts);

export default productRouter;