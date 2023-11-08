/**
 * Adapter build bad request message from Joi lib format
 */
export function createBadRequestMessage(error) {
    return error.details?.map(detail => ({
        type: detail.type,
        message: detail.message,
    }));
}
