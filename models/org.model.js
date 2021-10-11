import mongoose from "mongoose";
const { Schema } = mongoose;
import { MetaInfo } from "./common.model";

const OrgSchema = new Schema({
    orgId: { //nanoid
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
    domain: {
        type: String,
        required: true
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'organizations'
});

module.exports = mongoose.model('Organizations', OrgSchema);
