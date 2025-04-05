import { varSchemaTransacao } from "../schemas/transactionsSchema.js";
import { db } from "../config/database.js";



export async function varPostEntradaSaida(req, res) {
    const varTransacao = req.body;
    const token = req.headers.authorization; // retirar o Bearer com split

    const varValidacao = varSchemaTransacao.validate(varTransacao, { abortEarly: false });
    const varTipoCerto = ["deposit", "withdraw"]

    if (!varValidacao) {
        return res.sendStatus(422);
    }

    if (!varTipoCerto.includes(varTransacao.type)) {
        return res.sendStatus(422)
    }

    try {
        await db.collection("transactions").insertOne(varTransacao);
        return res.sendStatus(200);

    } catch (error) {
        return res.status(422).send(error.message);
    }


}

export async function var2(req, res) {
    //alguma coisa aqui

}



export async function var3(req, res) {
    //alguma coisa aqui

}

export async function var4(req, res) {
    //alguma coisa aqui

}
