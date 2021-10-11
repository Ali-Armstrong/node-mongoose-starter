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
const pjson = require('./package.json');

const UserRoutes = require('./routes/users.routes');
const AuthRoutes = require("./routes/auth.routes");


//app settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.json({limit: 10241020, type: 'application/json'}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

//setup routes
app.use('/auth', AuthRoutes)
app.use('/users', UserRoutes);
//health check api
app.use('/', (req,res) => {
    res.send({
        name : pjson.name,
        version : pjson.version,
        environment : config.env
    })
});


app.listen(config.port, ()=>{
    logger.info(`App started on port ${config.port}`)
})
