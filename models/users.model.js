import mongoose from "mongoose";
const { Schema } = mongoose;
import { MetaInfo } from "./common.model";

const UserSchema = new Schema({
    userId: {
        type: String,
    },
    metaInfo: MetaInfo,
    name: {
        type: String,
        minlength: 1,
        maxlength: 64,
    },
    email: {
        type: String,
        lowercase: true,
    },
    pass: {
        type: String,
    },
    salt: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    calenderLink: {
        type: String,
    },
    orgId: {
        type: String,
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' }
});

module.exports = mongoose.model('Users', UserSchema);
