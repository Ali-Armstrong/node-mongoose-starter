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
const jwt = require("./utils/jwt");
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

const isAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
        return error(res, "Token Required", 403);
    }
    try {
        const decoded = jwt.verify(token, {});
        req.user = decoded;
    } catch (err) {
        logger.error(err)
        return error(res, "Invalid Token", 401);
    }
    return next();
};

//setup routes
v1.use('/auth', AuthRoutes)
v1.use('/users', isAuthorized, UserRoutes);
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


app.listen(config.port, ()=>{
    logger.info(`App started on port ${config.port}`)
})
