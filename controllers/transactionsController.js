import { varSchemaTransacao } from "../schemas/transactionsSchema.js";
import { db } from "../config/database.js";
import { ObjectId } from "mongodb";



export async function varPostEntradaSaida(req, res) {
    const varTransacao = req.body;

    const { error } = varSchemaTransacao.validate(varTransacao, { abortEarly: false, convert: false });
    const varTipoCerto = ["deposit", "withdraw"]

    if (error) {
        return res.sendStatus(422);
    }

    if (!varTipoCerto.includes(varTransacao.type)) {
        return res.sendStatus(422)
    }

    try {
        await db.collection("transactions").insertOne({
            ...varTransacao,
            userId: res.locals.user._id
        });
        return res.sendStatus(200);

    } catch (error) {
        return res.status(422).send(error.message);
    }


}


export async function varGetTransacoes(req, res) {
    const varPaginas = req.query.page || 1;
    const limit = 10;
    const start = (varPaginas - 1) * limit;


    try {
        const varValidado = res.locals.user._id;
        const varTodas = await db.collection("transactions")
        .find({ userId: varValidado })
        .skip(start)
        .limit(limit)
        .sort({ _id: -1 })
        .toArray();
        return res.status(200).send(varTodas);

    } catch (error) {
        return res.status(422).send(error.message);
    }
}



export async function varPutTransacoes(req, res) {
    const { id } = req.params;
    const varNova = req.body;
    const validId = await db.collection("transactions").findOne({ _id: new ObjectId(id) });

    const { error } = varSchemaTransacao.validate(varNova, { abortEarly: false, convert: false });

    if (error) {
        return res.sendStatus(422);
    }

    if (!validId) {
        return res.sendStatus(404);
    }

    try {
        await db.collection("transactions").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: { 
                ...varNova,  
                userId: res.locals.user._id}
        });

        return res.sendStatus(204);
    }

    catch (err) {
        return res.status(500).send(err.message);
    }

}

export async function varDeleta(req, res) {
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

    catch (err) {
        return res.status(500).send(err.message);
    }
}
