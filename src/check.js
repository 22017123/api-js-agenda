import Joi from 'joi';

export const contatoModel = Joi.object({
    nome: Joi.string().min(3).required(),
    telefone: Joi.string().min(11).required(),
    email: Joi.string().email().required(),
    nota: Joi.string().default(""),
    ativo: Joi.boolean().default(true)
});

export const contatoModelUpdate = Joi.object({
    nome: Joi.string().min(3),
    telefone: Joi.string().min(11),
    email: Joi.string().email(),
    nota: Joi.string(),
    ativo: Joi.boolean()
});