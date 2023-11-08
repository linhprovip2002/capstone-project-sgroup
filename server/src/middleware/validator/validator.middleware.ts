import { createInboundValidatorByJoi } from './validatorBuilder'
import Joi from 'joi';
const EIGHT_CHAR_CONTAINS_ONE_LETTER_AND_ONE_NUMBER_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateUserUpdate = createInboundValidatorByJoi(
    Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        gender: Joi.boolean().required(),
        phone: Joi.number().required(),
        dayOfBirth: Joi.date().required(),
        profileImage: Joi.string()
    })
);

const validateStatusUser = createInboundValidatorByJoi(
    Joi.object({
        isActive: Joi.string().required().valid('active','blockposting','blockcomment','banner'),
    })
);
const validateUserRegister = createInboundValidatorByJoi(
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
        .regex(EIGHT_CHAR_CONTAINS_ONE_LETTER_AND_ONE_NUMBER_REGEX)
        .message('Password should contains 8 chars with 1 char and 1 num'),
    })
);
export { 
    validateUserRegister,
    validateUserUpdate,
    validateStatusUser
};