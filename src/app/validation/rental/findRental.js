const Joi = require('joi');
const validateCnpj = require('../../utils/validation/validateCnpj.js');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().min(3).max(20),
      cnpj: Joi.string()
        .trim()
        .min(14)
        .max(14)
        .custom((value, helper) => {
          if (!validateCnpj(value)) {
            return helper.message(`cnpj '${value}' is invalid, enter one valid!`);
          }
          return true;
        }),
      atividades: Joi.string().min(5).max(40).trim(),
      endereco: Joi.array()
        .min(1)
        .unique('cep')
        .items(
          Joi.object({
            cep: Joi.string().min(8).max(8).trim(),
            number: Joi.string().min(1).trim(),
            complemento: Joi.string().min(5).max(40).trim(),
            isFilial: Joi.boolean()
          })
        )
    });
    const { error } = await schema.validate(req.body, { abortEarly: true });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json({
      description: error.details[0].path[0],
      name: error.message
    });
  }
};
