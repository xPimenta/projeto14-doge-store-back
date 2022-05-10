import express from "express"
import cors from "cors"
import chalk from "chalk"
import userRouter from "./routes/userRouter.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use(userRouter)

app.listen(process.env.PORT, () => {
  console.log(
    chalk.bold.blue(`Server is running on port ${process.env.PORT}`)
    );
  });