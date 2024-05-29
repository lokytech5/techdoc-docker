import Joi from "joi";

const createProjectSchema = Joi.object({
    name: Joi.string().required(),
    repository_url: Joi.string().allow('', null),
    description: Joi.string().required(),
    technicalStack: Joi.string().allow('', null),    
    goals: Joi.string().allow('', null),
    additionalDocs: Joi.string().allow('', null),
    blobUrl: Joi.string().allow('', null),
    userId: Joi.string()
})

export { createProjectSchema as projectSchema }