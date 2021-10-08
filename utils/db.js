const mongoose = require('mongoose');
const config = require('../config/index');
const logger = require('../utils/logger');

const options = {
    maxPoolSize : 5,
    useNewUrlParser: true,
}

// Create the database connection
mongoose.connect(config.databaseURI, options);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});