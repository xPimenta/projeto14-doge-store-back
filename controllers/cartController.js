import dataBase from "../database.js";
import { ObjectId } from "mongodb";

export async function postProductToCart(req, res) {
  const { localToken } = req.body;
  const { card } = req.body;

  try {
    const session = await dataBase.collection("sessions").findOne({ token: localToken });
    const cart = await dataBase.collection("users").updateOne({ _id: ObjectId(session.id) }, { $push: { cart: card } });

    if (!card) {
      res.sendStatus(404);
      return;
    }
    res.send(cart);
  } catch (e) {
    res.sendStatus(e);
  }
}

export async function getCart(req, res) {
  const { localToken } = req.query;

  try {
    const session = await dataBase.collection("sessions").findOne({ token: localToken });
    const user = await dataBase.collection("users").findOne({ _id: ObjectId(session.id) });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.send(user.cart);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postBuyCards(req, res) {
  const { localToken } = req.body;
  const { cards } = req.body;

  try {
    const session = await dataBase.collection("sessions").findOne({ token: localToken });
    const owned = await dataBase.collection("users").updateOne({ _id: ObjectId(session.id) }, { $push: { owned: cards } });
    if (!cards) {
      res.sendStatus(404);
      return;
    }
    res.send(owned);
  } catch (e) {
    res.sendStatus(e);
  }
}

export async function getOwnedCards(req, res) {
  const { localToken } = req.query;
  console.log(req.header)

  try {
    const session = await dataBase.collection("sessions").findOne({ token: localToken });
    const user = await dataBase.collection("users").findOne({ _id: ObjectId(session.id) });

    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.send(user.owned);
  } catch (e) {
    res.sendStatus(500);
  }
}
