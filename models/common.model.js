//this file contains some common schema definations
const MetaInfo = {
    createdAt: {
        type: Number
    },
    createdBy: {
        type: String
    },
    updatedAt: {
        type: Number
    },
    updatedBy: {
        type: String
    },
    deletedAt: {
        type: Number
    },
    deletedBy: {
        type : String
    }
}

module.exports = {
    MetaInfo,
}