import bcrypt from "bcrypt"
import { v4 as uuid} from "uuid"
import dataBase from "../database.js"

export async function resgisterUser(req,res) {
    const user = req.body

    const emailExists = await dataBase.collection("users").findOne({ email: user.email })
    if (emailExists) return res.status(409).send("Email already in use")

    const encryptedPassword = bcrypt.hashSync(user.password, 10)
    try{
        await dataBase.collection("users").insertOne({
            name: user.name,
            email: user.email,
            password: encryptedPassword,
            cart: [],
            owned: [],
        })
        res.sendStatus(201).send("Account created succesfully.")
    }catch(e){
        res.sendStatus(422).send()
    }
}

export async function loginUser(req,res) {
    const login = req.body
    try{
        const user = await dataBase.collection("users").findOne({email: login.email})
        if(user && bcrypt.compareSync(login.password, user.password)){
            const token = uuid()
            dataBase.collection("sessions").insertOne({
                id: user._id,
                token
            })
            res.send([token, user.name]).status(200)
            }
        else{
            res.sendStatus(400).send("Email or password is incorrect.")
        }
    }
    catch(e){
        res.sendStatus(400)
    }
}