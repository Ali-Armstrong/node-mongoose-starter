import mongoose from "mongoose";
const { Schema } = mongoose;
import { MetaInfo } from "./common.model";

const UserSchema = new Schema({
    userId: { //nanoid
        type: String,
        required: true
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
    calenderLink: {
        type: String,
        required: true
    },
    orgInfo: {
        orgId: {
            type: String
        },
        orgName: {
            type: String
        }
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'users'
});

module.exports = mongoose.model('Users', UserSchema);
