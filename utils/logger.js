const { createLogger, format, transports } = require('winston');
const winston = require('winston');

module.exports = createLogger({
    //creating global format for logging
    format:format.combine(
        errors({ stack: true }),
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}: ${info.stack || ''}`),
    ),
    //where to place winston logs, can be changed to store logs in db or other
    transports:[
        new winston.transports.Stream({
            stream: process.stderr,
            level: 'debug',
        })
    ]
});