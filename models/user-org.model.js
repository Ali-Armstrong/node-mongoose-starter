const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const UserOrg = new Schema({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId().toString()
    },
    metaInfo: MetaInfo,
    userId: {
        type: String
    },
    orgId: {
        type: String
    },
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
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'user-org'
});

module.exports = mongoose.model('UserOrg', UserOrg);
