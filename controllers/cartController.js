import dataBase from "../database.js";
import { ObjectId } from "mongodb"

export async function postProductToCart(req, res){

  const { user } = req.body;
	const { card } = req.body;

  try{
      const cart = await dataBase.collection("users").updateOne(
        { name: user },
        { $push: { cart: card } }
      );
      console.log(cart)
      if(!card){
          res.sendStatus(404);
          return;
      }
      res.send(card);
  }
  catch(e){
      res.sendStatus(e);
  }
}

export async function deleteProductInCart(req, res){

  const { user } = req.body;
	const { card } = req.body;

  try{
      const cart = await dataBase.collection("users").updateOne(
        { name: user },
        { $delete: { cart: card } }
      );
      console.log(cart)
      if(!card){
          res.sendStatus(404);
          return;
      }
      res.send(card);
  }
  catch(e){
      res.sendStatus(e);
  }
}

export async function getCart(req, res){
  try{
      const cart = await dataBase.collection("users").find(cart).toArray();
      console.log(cart);
      if(!cart){
          res.sendStatus(404);
          return;
      }

      res.send(cart);
  }
  catch(e){
      res.sendStatus(500);
  }
}
