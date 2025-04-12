import { db } from "../config/database.js";
import { ObjectId } from "mongodb";

export async function postTransaction(req, res) {
    const transaction = req.body;
    const checkType = ["deposit", "withdraw"]

    if (!checkType.includes(transaction.type)) {
        return res.sendStatus(422)
    }

    try {
        await db.collection("transactions").insertOne({
            ...transaction,
            userId: res.locals.user._id
        });
        return res.sendStatus(200);

    } catch (error) {
        return res.status(422).send(error.message);
    }
}; 


export async function getTransaction(req, res) {
    const pages = req.query.page || 1;
    const limit = 10;
    const start = (pages - 1) * limit;

    try {
        const validate = res.locals.user._id;
        const allTransactions = await db.collection("transactions")
        .find({ userId: validate })
        .skip(start)
        .limit(limit)
        .sort({ _id: -1 })
        .toArray();
        return res.status(200).send(allTransactions);

    } catch (error) {
        return res.status(422).send(error.message);
    }
};


export async function putTransaction(req, res) {
    const { id } = req.params;
    const updatedTransaction = req.body;
    const validId = await db.collection("transactions").findOne({ _id: new ObjectId(id) });

    if (!validId) {
        return res.sendStatus(404);
    }

    try {
        await db.collection("transactions").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: { 
                ...updatedTransaction,  
                userId: res.locals.user._id}
        });

        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function deleteTransaction(req, res) {
    const { id } = req.params;

    try {
        const result = await db.collection("transactions").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.sendStatus(404);
        };

        return res.sendStatus(204);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};