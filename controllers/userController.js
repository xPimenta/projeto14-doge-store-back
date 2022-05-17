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
            purchasedData: {}
        })
        res.status(201).send("Account created succesfully.")
    }catch(e){
        res.status(422).send("Error creating account")
        console.log(e);
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
            res.status(200).send([token, user.name])
            }
        else{
            res.status(400).send("Email or password is incorrect.")
        }
    }
    catch(e){
        res.sendStatus(400)
    }
}

export async function checkoutUser(req, res){
    const userData = res.locals.user;
    try{
        const user = await dataBase.collection("users").findOne({ email: userData.email });
        if(!user){
            return res.sendStatus(401);
        }
        
        await dataBase.collection("users").updateOne(
            { email: userData.email },
            { $set: {purchasedData: {
                cpf: userData.cpf,
                address: userData.address,
                cep: userData.cep,
                cardNumber: userData.cardNumber
            } } }
        );
        
        const buyerData = await dataBase.collection("users").findOne({ email: userData.email });
        if (!buyerData) {
          res.sendStatus(404);
          return;
        }

        /* Deleta dados sensíveis */
        delete buyerData.password;
        delete buyerData.purchasedData.cardNumber;

        res.status(200).send(buyerData);

        
    }
    catch{
        res.sendStatus(400);
    }
}