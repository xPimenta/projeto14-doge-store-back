import { resgisterUser, loginUser } from "../controllers/userController.js"
import {signUpSchemaMiddleware, signInSchemaMiddleware} from "../middlewares/schemaValidationMiddleware.js"
import { Router } from "express"

const userRouter = Router()
userRouter.post("/sign-up", signUpSchemaMiddleware , resgisterUser)
userRouter.post("/sign-in", signInSchemaMiddleware, loginUser)

export default userRouter