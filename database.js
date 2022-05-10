import dotenv from "dotenv"
import {MongoClient} from "mongodb"
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)
let dataBase = null

try{
    await mongoClient.connect()
    dataBase = mongoClient.db(process.env.BASE_MONGO)
}catch(e){
    console.log(e)
}

export default dataBase;