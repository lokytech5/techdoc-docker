import Joi from "joi";

const createAuthSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
})

export { createAuthSchema as authSchema }