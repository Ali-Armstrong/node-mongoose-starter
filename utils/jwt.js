const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

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
 * @desc verify give token is valid or not
 * @param {String} token 
 * @param {Object} opts 
 * @returns {Boolean}
 */
exports.verify = (token, opts) => {
    //override custom options with default options
    const verifyOpts = {
        issuer: opts.issuer || options.issuer,
        audience: opts.audience || options.audience,
        expiresIn: opts.expiresIn || options.expiresIn,
        algorithms: [options.algorithm]
    }
    //console.log(token.toString(), {algorithms: [options.algorithm]}, publicKEY)
    return jwt.verify(token.toString(), publicKEY.toString(), verifyOpts);
}

/**
 * @desc decode the given token
 * @param {string} token 
 * @returns {Object}
 */
exports.decode = (token) => {
	return jwt.decode(token, {complete: true});
}