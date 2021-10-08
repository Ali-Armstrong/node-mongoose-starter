//this file contains some common schema definations
import mongoose from "mongoose";
const { Schema } = mongoose;

const MetaInfo = new Schema({
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
})

module.exports = {
    MetaInfo,
}