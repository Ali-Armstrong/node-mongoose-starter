const {MetaInfo} = require('../schemas/common.schema');

exports.UserSchema = {
    type: "object",
    required : ["email","calendarLink","password"],
    properties : {
        name: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
        calendarLink: {
            type: String,
        }
    }
}