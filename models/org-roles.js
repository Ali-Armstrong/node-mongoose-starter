const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const RoleSchema = new Schema({
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
    orgId: {
        type: String,
    },
    scopes: {
        type: [String]
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'org-roles'
});

module.exports = mongoose.model('OrgRoles', RoleSchema);
