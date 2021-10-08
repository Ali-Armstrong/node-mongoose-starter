require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/index');
const db = require('./utils/db');
const logger = require('./utils/logger');

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.json({limit: 10241020, type: 'application/json'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

app.listen(config.port, ()=>{
    logger.info(`App started on port ${config.port}`)
})
