import { Router } from "express";
import { postProductToCart, getCart, postBuyCards, getOwnedCards} from "../controllers/cartController.js";

const cartRouter = Router();
cartRouter.post("/cart-post", postProductToCart);
cartRouter.get("/cart-get", getCart);
cartRouter.post("/cart-buy", postBuyCards);
cartRouter.get("/cart-owned", getOwnedCards);

export default cartRouter;