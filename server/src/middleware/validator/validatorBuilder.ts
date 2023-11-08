import { HttpResponseBuilder } from '../error/';
import { createBadRequestMessage } from './bad-request-message.factory'

/**
 *
 * @param {import('Joi').ObjectSchema} joiSchema
 */
export function createInboundValidatorByJoi(joiSchema) {
    return async (req, res, next) => {
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false });

            return next();
        } catch (error) {
            return HttpResponseBuilder.buildBadRequest(
                res,
                createBadRequestMessage(error),
            );
        }
    };
}
