import Joi from 'joi';
const schemaUserUpdate = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    gender: Joi.boolean().required(),
    phone: Joi.number().required(),
    dayOfBirth: Joi.date().required(),
    profileImage: Joi.string()
    });
const schemaStatusUser = Joi.object({
    isActive: Joi.string().required().valid('active','blockposting','blockcomment','banner'),
    });
async function validateUserUpdate(req, res, next) {
    try {
        await schemaUserUpdate.validateAsync(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.details[0].message });
    }
}
async function validateStatusUser(req, res, next) {
    try {
        await schemaStatusUser.validateAsync(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.details[0].message });
    }
}
export { 
    validateUserUpdate,
    validateStatusUser
};