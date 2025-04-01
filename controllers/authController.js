
import { var1, var2 } from "../schemas/authSchema.js";
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function varCadastro(req, res) {
    const varUsuario = req.body;
    const varValidacao = var1.validate(varUsuario, { abortEarly: false });
    const varEmail = await db.collection("users").findOne({ email: varUsuario.email })


    if (varValidacao.error) {
        const message = varValidacao.error.details.map(detail => detail.message);
        return res.status(422).send(message);
    }

    if (varEmail) {
        return res.sendStatus(409);
    }

    try {
        await db.collection("users").insertOne({
            ...varUsuario,
            password: bcrypt.hashSync(varUsuario.password, 10)
        });
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function varLogin(req, res) {
    const varUsuario = req.body;
    const token = jwt.sign({}, process.env.JWT_SECRET)
    const varValidacao = var2.validate(varUsuario, { abortEarly: false });

    if (varValidacao.error) {
        const message = varValidacao.error.details.map(detail => detail.message);
        return res.status(422).send(message);
    }

    try {
        const varCadastrado = await db.collection("users").findOne({ email: varUsuario.email });

        if (!varCadastrado) {
            return res.sendStatus(404);
        }

        if (varCadastrado && bcrypt.compareSync(varUsuario.password, varCadastrado.password)) {
            return res.status(200).send(token);
        }
        else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }

}
