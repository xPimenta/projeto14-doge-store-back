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

// export const statementMiddleware = (req,res,next) => {
//     const newStatement = req.body
//     const statementSchema = Joi.object({
//         value: Joi.string().required(),
//         description: Joi.string().required()
//     })
//     const validation = statementSchema.validate(newStatement)
//         if(validation.error){
//             res.sendStatus(422)
//             return
//         }
//         else{
//             res.locals.newStatement = newStatement
//         }
//         next()
// }