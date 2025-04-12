export function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false, convert: false });
        if (error) {
            const message = error.details.map(detail => detail.message);
            return res.status(422).send(message);
        }
        next();
    }
}