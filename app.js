require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/index');
const logger = require('./utils/logger');
const pjson = require('./package.json');
const jwt = require("./utils/jwt");
const init = require('./init');
const { success, error } = require("./utils/responses");

const v1 = express.Router();
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
v1.use('/auth', AuthRoutes)
v1.use('/users', jwt.isAuthorized, UserRoutes);
app.use('/v1', v1);
//app.use('/', v1); // Set the default version to latest.

//health check api
app.get('/', (req,res) => {
    res.send({
        name : pjson.name,
        version : pjson.version,
        environment : config.env
    })
});

//Capture All 404 errors
app.use('*', function (req,res,next){
    return error(res, "Resource Not Found", 404);
});

//start initializing app
init.start(app);

//start server once initialization is done
app.on('ready', () => {
    app.listen(config.port, ()=>{
        logger.info(`App started on port ${config.port}`)
    });
});
