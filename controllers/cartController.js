import dataBase from "../database.js";
import { ObjectId } from "mongodb";

export async function postProductToCart(req, res) {
  const { user } = req.body;
  const { card } = req.body;

  try {
    const userDb2 = await dataBase
      .collection("users")
      .updateOne({ name: user }, { $push: { cart: card } });
    if (!card) {
      res.sendStatus(404);
      return;
    }
    res.send(card);
  } catch (e) {
    res.sendStatus(e);
  }
}

export async function getCart(req, res) {
  const { user } = req.query;
  try {
    const userDb = await dataBase.collection("users").findOne({ name: user });

    if (!userDb) {
      res.sendStatus(404);
      return;
    }

    res.send(userDb.cart);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function postBuyCards(req, res) {
  const { user } = req.body;
  const cards = req.body.cards;

  try {
    const cart = await dataBase
      .collection("users")
      .updateOne({ name: user }, { $push: { owned: cards } });
    if (!cards) {
      res.sendStatus(404);
      return;
    }
    res.send(cards);
  } catch (e) {
    res.sendStatus(e);
  }
}

export async function getOwnedCards(req, res) {
  const { user } = req.query;
  try {
    const userDb = await dataBase.collection("users").findOne({ name: user });

    if (!userDb) {
      res.sendStatus(404);
      return;
    }

    res.send(userDb.owned);
  } catch (e) {
    res.sendStatus(500);
  }
}
