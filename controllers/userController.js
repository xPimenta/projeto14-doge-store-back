import bcrypt from "bcrypt"
import { v4 as uuid} from "uuid"
import dataBase from "../database.js"

export async function resgisterUser(req,res) {
    const user = res.locals.user
    const encryptedPassword = bcrypt.hashSync(user.password, 10)
    try{
        await dataBase.collection("users").insertOne({
            name: user.name,
            email: user.email,
            password: encryptedPassword
        })
        res.sendStatus(201)
    }catch(e){
        res.sendStatus(422)
    }
}

export async function loginUser(req,res) {
    const login = res.locals.user
    try{
        const user = await dataBase.collection("users").findOne({email: login.email})
        if(bcrypt.compareSync(login.password, user.password)){
            const token = uuid()
            dataBase.collection("sessions").insertOne({
                id: user._id,
                token
            })
            res.send([token, user.name]).status(200)
            }
        else{
            res.sendStatus(400)
        }
    }
    catch(e){
        res.sendStatus(400)
    }
}