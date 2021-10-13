const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
const authService = require("../services/auth.service");
const { success, error } = require("../utils/responses");
const validateSchema = require("../utils/validator");

/**
 * @desc onboarding new user
 * @param {username,password} body - body contains username and password
 * @returns {token} authorization token
 */
router.post("/signup", validateSchema("signup"), async function (req, res) {
    try {
        const response = await authService.signup(req.body);
        return success(res, "ok", response, 200);
    } catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

/**
 * @desc Login user with given credentials
 * @param {username,password} body - body contains username and password
 * @returns {token} authorization token
 */
router.post("/login", validateSchema("signin"), async function (req, res) {
    try {
        const resp = await authService.signin(req.body);
        return success(res, "ok", resp.message, resp.code);
    } catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

/**
 * @desc send recovery email upon requesting reset password
 * @param {email} body - body contains user email
 * @returns {Object}
 */
router.post("/recover", async function (req, res) {
    try{
        const recoverAccount = await authService.recover(req.body);
        if(!recoverAccount){
            return error(res, "User not associated with any account", 401);
        }
        return success(res, "ok", "success", 200);
    }catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

/**
 * @desc Validate recover token while resetting password
 * @param {token} body - body contains recover token
 * @returns {Object}
 */
router.post("/validate-recover-token", async function (req, res){
    try{
        const valid = await authService.validateRecoverToken(req.body);
        if(!valid){
            return error(res, "Password reset token is invalid or has expired.", 401);
        }
        return success(res, "ok", valid, 200);
    }catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

/**
 * @desc Reset current user password with the new one
 * @param {token, password} body - body contains recover token
 * @returns {Object}
 */
router.post("/reset-password", validateSchema('reset-password'), async function (req, res){
    try{
        const valid = await authService.resetPassword(req.body);
        if(!valid){
            return error(res, "Password reset token is invalid or has expired.", 401);
        }
        return success(res, "ok", "Your password has been updated.", 200);
    }catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

module.exports = router;
