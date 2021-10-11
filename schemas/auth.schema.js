
const SignUpSchema = {
    type: "object",
    required : ["email","password"],
    properties : {
        password: {
            type: String
        },
        email: {
            type: String
        }
    }
}

const SignInSchema = {
    type: "object",
    required : ["email","password"],
    properties : {
        password: {
            type: String
        },
        email: {
            type: String
        }
    }
}

module.exports = {
    SignInSchema,
    SignUpSchema
}