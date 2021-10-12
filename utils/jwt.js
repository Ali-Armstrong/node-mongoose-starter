const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const logger = require('../utils/logger');
const { error } = require("../utils/responses");

const privateKEY 	= fs.readFileSync('./private.key', 'utf8'); // to sign JWT
const publicKEY 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT

//default signin settings
const options = config.auth

/**
 * @desc sign the data and generate jwt token
 * @param {Object} payload 
 * @param {Objects} opts 
 * @returns {String} token
 */
exports.sign = (payload, opts) => {
    //override custom options with default options
    const signinOpts = {
        issuer: opts.issuer || options.issuer,
        audience: opts.audience || options.audience,
        subject: opts.subject,
        expiresIn: opts.expiresIn || options.expiresIn,
        algorithm: opts.algorithm || options.algorithm
    }

    return jwt.sign(payload, privateKEY, signinOpts);
}

/**
 * @desc verify token from request and check if the user authorized or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.isAuthorized = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
        return error(res, "Token Required", 403);
    }
    try {
        const verifyOpts = {
            issuer: options.issuer,
            audience: options.audience,
            expiresIn: options.expiresIn,
            algorithms: [options.algorithm]
        }
        //console.log(token.toString(), {algorithms: [options.algorithm]}, publicKEY)
        const decoded = jwt.verify(token.toString(), publicKEY.toString(), verifyOpts);
        req.user = decoded;
    } catch (err) {
        logger.error(err)
        return error(res, err.message, 401);
    }
    return next();
};

/**
 * @desc decode the given token
 * @param {string} token 
 * @returns {Object}
 */
exports.decode = (token) => {
	return jwt.decode(token, {complete: true});
}