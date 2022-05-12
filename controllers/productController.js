import dataBase from "../database.js";

export async function getProducts(req, res){
    try{
        const products = await dataBase.collection("products").find().toArray();
        if(!products){
            res.sendStatus(404);
            return;
        }

        res.send(products);
    }
    catch(e){
        res.sendStatus(500);
    }
}