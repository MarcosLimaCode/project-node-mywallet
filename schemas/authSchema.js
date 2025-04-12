import joi from "joi";

export const registerUser = joi.object(
    {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

export const loginUser = joi.object(
    {
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });