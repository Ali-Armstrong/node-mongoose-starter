const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const InviteSchema = new Schema({
    _id: {
        type: String
    },
    metaInfo: MetaInfo,
    inviterInfo: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    inviteeInfo: {
        id: {
            type: String
        },
        email: {
            type: String
        }
    },
    inviteToken: {
        type: String,
        required: true
    },
    inviteTokenExpiry: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["sent", "accepted", "signed-up"]
    }

},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'invites'
});

module.exports = mongoose.model('Invites', InviteSchema);
