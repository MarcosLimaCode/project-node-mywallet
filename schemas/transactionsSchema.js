import joi from "joi";


//adicao de transação
const var1 = joi.object(
    {
        value: joi.string().required(),
        description: joi.string().email().required(),
        type: joi.string().required()
    })

