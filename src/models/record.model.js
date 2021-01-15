const Joi = require("@hapi/joi");

const RecordCard = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    cpf: Joi.string().required().min(14).max(14),
    address: Joi.string().required().min(8).max(50),
    state: Joi.string().required().min(2).max(30),
    zipCode: Joi.string().required().min(10).max(10),
    city: Joi.string().required().min(3).max(30),
    payment: Joi.string().min(3).max(25).required(),
    cardName: Joi.string().min(3).max(25).required(),
    cardExpiration: {
        month: Joi.number().min(0).max(11).required(),
        year: Joi.number().min(2021).max(2100).required(),
    },
    cardNumber: Joi.string().trim()
        .normalize()
        .required()
        .creditCard()
        .messages({
            "any.creditCard": "This credit card number is not valid"
        }),
    securityCode: Joi.string().min(3).max(3).required(),
});

const RecordBankSlip = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    cpf: Joi.string().required().min(14).max(14),
    address: Joi.string().required().min(8).max(50),
    state: Joi.string().required().min(2).max(30),
    zipCode: Joi.string().required().min(10).max(10),
    city: Joi.string().required().min(3).max(30),
    payment: Joi.string().min(3).max(25).required(),
});


module.exports = { RecordCard, RecordBankSlip };