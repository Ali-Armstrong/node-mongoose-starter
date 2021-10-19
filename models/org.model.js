const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const OrgSchema = new Schema({
    _id: {
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
