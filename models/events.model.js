const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MetaInfo } = require("./common.model");

const EventSchema = new Schema({
    eventId: {
        type: String,
        required: true,
    },
    metaInfo: MetaInfo,
    userId: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ["one-on-one","group","collective","round-robin"],
        default: "one-on-one",
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    location: { //zoom || gmeet || call etc
        type: String
    },
    eventDescription: {
        type: String
    },
    eventLink: {
        type: String,
        required: true
    }
},{
    timestamps: { createdAt: 'metaInfo.createdAt', updatedAt: 'metaInfo.updatedAt' },
    collection : 'events'
});

module.exports = mongoose.model('Events', EventSchema);
