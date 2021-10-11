const {MetaInfo} = require('../schemas/common.schema');

exports.UserSchema = {
    type: "object",
    required : ["email","calendarLink","password"],
    properties : {
        name: {
            type: "string"
        },
        password: {
            type: "string"
        },
        email: {
            type: "string"
        },
        calendarLink: {
            type: "string",
        }
    }
}