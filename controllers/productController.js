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

export async function getCard(req, res){
    // Converting ID to be recognized by collection
    const id = (req.params.id)
   
    try{
        const card = await dataBase.collection("products").findOne({id:id});
        if(!card){
            res.sendStatus(404);
            return;
        }

        res.send(card);
    }
    catch(e){
        res.sendStatus(500);
    }
}