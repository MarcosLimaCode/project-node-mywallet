import joi from "joi";


//adicao de transação
export const varSchemaTransacao = joi.object(
    {
        value: joi.number().positive().precision(2).required(),
        description: joi.string().required(),
        type: joi.string().required()
    })

