import { Router } from "express";
import { postProductToCart} from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.post("/cart-post", postProductToCart);
// cartRouter.get("/cart-get", getCart);


export default cartRouter;