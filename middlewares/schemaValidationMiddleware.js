import Joi from "joi"

export const signUpSchemaMiddleware = (req, res, next) => {
    const user = req.body
    const signUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeatPassword: Joi.ref("password")
    })
    const validation = signUpSchema.validate(user)
    if(validation.error){
        return res.sendStatus(422)
    }
    else{
        res.locals.user = user
    }
    next()
}

export const signInSchemaMiddleware = (req, res, next) => {
    const signInSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const user = req.body
    const validation = signInSchema.validate(user)
    if(validation.error){
        res.sendStatus(422)
        return
    }
    else{
        res.locals.user = req.body
    }
    next()
}

export const checkoutMiddleware = (req, res, next) => {
    const checkoutSchema = Joi.object({
        email: Joi.string().email().required(),
        cpf: Joi.string().required(),
        address: Joi.string().required(),
        cep: Joi.string().required(),
        cardNumber: Joi.string().required()
    });
    const userData = req.body;
    const validation = checkoutSchema.validate(userData);
    if(validation.error){
        res.sendStatus(422);
        return;
    }
    else{
        res.locals.user = req.body;
        // console.log(req.body)/*IMPRIME -> {cpf: '12345678911', address: 'Rua Ayrton Sena', cep: '87654321', cardNumber: '123321'}*/
    }
    next();
}