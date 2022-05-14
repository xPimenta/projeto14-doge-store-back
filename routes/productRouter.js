import { Router } from "express";
import { getProducts, getCard } from "../controllers/productController.js";

const productRouter = Router();
productRouter.get("/products", getProducts);
productRouter.get("/card/:id", getCard);

export default productRouter;