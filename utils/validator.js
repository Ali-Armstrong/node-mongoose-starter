const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, removeAdditional: false });
const { InviteUserSchema, InviteOnboardSchema } = require("../schemas/users.schema");
const { SignInSchema, SignUpSchema, ResetPasswordSchema } = require("../schemas/auth.schema");
const { error } = require("../utils/responses");
ajv.addSchema(SignUpSchema, "signup");
ajv.addSchema(SignInSchema, "signin");
ajv.addSchema(ResetPasswordSchema, 'reset-password');
ajv.addSchema(InviteUserSchema, 'invite-user');
ajv.addSchema(InviteOnboardSchema, "onboard-user");


/**
 * @desc Format error responses
 * @param {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
    let errors = schemaErrors.map((error) => {
        return {
            path: error.instancePath,
            message: error.message,
        };
    });
    return errors
}

/**
 * @desc Validates incoming request bodies against the given schema,
 *       providing an error response when validation fails
 * @param {String} schemaName - name of the schema to validate
 * @return {Object} response
 */
const validateSchema = (schemaName) => {
    return (req, res, next) => {
        let valid = ajv.validate(schemaName, req.body);
        if (!valid) {
            return error(res, errorResponse(ajv.errors), 400);
        }
        next();
    };
};

module.exports = validateSchema
