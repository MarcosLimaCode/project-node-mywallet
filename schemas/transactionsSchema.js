import joi from "joi";


//adicao de transação
export const varSchemaTransacao = joi.object(
    {
        value: joi.string().required(), // ALTERAR PARA FLOAT QUANDO TIVER WI FI
        description: joi.string().required(),
        type: joi.string().required()
    })

