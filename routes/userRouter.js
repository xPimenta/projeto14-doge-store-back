import { resgisterUser, loginUser, checkoutUser } from "../controllers/userController.js"
import {signUpSchemaMiddleware, signInSchemaMiddleware, checkoutMiddleware} from "../middlewares/schemaValidationMiddleware.js"
import { Router } from "express"

const userRouter = Router()
userRouter.post("/sign-up", signUpSchemaMiddleware , resgisterUser)
userRouter.post("/sign-in", signInSchemaMiddleware, loginUser)
userRouter.post("/checkout", checkoutMiddleware, checkoutUser)

export default userRouter