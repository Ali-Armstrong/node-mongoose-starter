const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const UserOrg = new Schema({
    _id: {
        type: String,
        required: true
    },
    metaInfo: MetaInfo,
    userId: {
        type: String
    },
    orgId: {
        type: String
    },
    orgName: {
        type: String,
        minlength: 1,
        maxlength: 64,
        required: true
    },
    userEmail: {
        type: String,
        lowercase: true,
        required: true
    },
    availability: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    calendarLink: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    confirmToken: {
        type: String
    },
    confirmTokenExpires: {
        type: Number
    },
    onBoardedVia: {
        type: String,
        required: true,
        enum: ["signup", "invite", "signup-confirmation"]
    },
    status: {
        type: String,
        required: true,
        enum: ["success", "awaiting-confirmation"],
        default: "success"
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'user-org'
});

module.exports = mongoose.model('UserOrg', UserOrg);
