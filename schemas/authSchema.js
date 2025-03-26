import joi from "joi";


//cadastro
const var1 = joi.object(
    {
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

//login
const var2 = joi.object(
    {
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })
