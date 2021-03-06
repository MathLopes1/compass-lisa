const Joi = require('joi').extend(require('@joi/date'));
const validateCpf = require('../../utils/validation/validateCpf.js');
const Enum = require('../../utils/Enums.js');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(3).max(40).trim().required(),
      cpf: Joi.string()
        .min(11)
        .max(11)
        .trim()
        .required()
        .custom((value, helper) => {
          if (!validateCpf(value)) {
            return helper.message(`cpf '${value}' is invalid, enter one valid!`);
          }
          return true;
        }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').less('2004-01-01').max('now').required(),
      email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: Enum.email } })
        .required(),
      senha: Joi.string().min(6).trim().required(),
      habilitado: Joi.string()
        .required()
        .trim()
        .valid(...Object.values(Enum.Habilitado))
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
