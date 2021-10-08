const MetaInfo = {
    type : "object",
    required : ["createdAt","createdBy"],
    properties : {
        createdAt : {
            type : "number"
        },
        createdBy : {
            type : "string"
        },
        updatedAt : {
            type : "number"
        },
        updatedBy : {
            type : "string"
        },
        deletedAt : {
            type : "number"
        },
        deletedBy : {
            type : "string"
        }
    }
}

module.exports = {
    MetaInfo,
}