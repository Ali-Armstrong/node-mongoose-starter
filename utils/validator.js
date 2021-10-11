const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true, removeAdditional: false });
const UserSchema = require("../schemas/users.schema");
const { SignInSchema, SignUpSchema } = require("../schemas/auth.schema");
ajv.addSchema(UserSchema, "new-user");
ajv.addSchema(SignUpSchema, "signup");
ajv.addSchema(SignInSchema, "signin");

/**
 * @desc Format error responses
 * @param {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
    let errors = schemaErrors.map((error) => {
        return {
            path: error.dataPath,
            message: error.message,
        };
    });
    return {
        success: false,
        code: 400,
        errors
    };;
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
            return res.send(errorResponse(ajv.errors));
        }
        next();
    };
};

module.exports = validateSchema
