import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();


export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
   
    if (!token) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoder) => {
            if (error) return res.sendStatus(401);

            const user = await db.collection("users").findOne({
                _id: new ObjectId(decoder.userId)
            })

            if (!user) return res.sendStatus(401);

            res.locals.user = user;
            return next();
        })
    } catch (error) {
        return res.sendStatus(500);
    }
};