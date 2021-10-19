const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const InviteSchema = new Schema({
    _id: {
        type: String,
        required: true
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
        role: {
            type: String
        },
        email: {
            type: String
        }
    },
    orgInfo: {
        id: {
            type: String
        },
        name: {
            type: String
        }
    },
    inviteToken: {
        type: String,
    },
    inviteTokenExpires: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["sent", "verified", "signed-up"],
        default: "sent"
    }

},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'invites'
});

module.exports = mongoose.model('Invites', InviteSchema);
