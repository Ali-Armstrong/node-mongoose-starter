
const SignUpSchema = {
    type: "object",
    required : ["email","password"],
    properties : {
        password: {
            type: "string"
        },
        email: {
            type: "string"
        }
    }
}

const SignInSchema = {
    type: "object",
    required : ["email","password"],
    properties : {
        password: {
            type: "string"
        },
        email: {
            type: "string"
        }
    }
}

module.exports = {
    SignInSchema,
    SignUpSchema
}