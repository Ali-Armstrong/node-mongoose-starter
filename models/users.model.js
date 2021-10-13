const mongoose = require('mongoose');
const { Schema } = mongoose;
const cryptoUtils = require("../utils/cryptoUtils");
const { MetaInfo } = require("./common.model");

const UserSchema = new Schema({
    _id : {
        type: String,
        default: mongoose.Types.ObjectId().toString()
    },
    metaInfo: MetaInfo,
    name: {
        type: String,
        minlength: 1,
        maxlength: 64,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    lastSignIn: {
        type: Number
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'users'
});

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = cryptoUtils.generateResetToken();
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model('Users', UserSchema);
