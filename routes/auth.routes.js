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
router.post("/signup", validateSchema("signup"), function (req, res) {
    try {
        const response = await authService.signup(req.body);
        res.json(success("ok", response, 200));
    } catch (err) {
        logger.error(err);
        res.json(error("Something went wrong", 500));
    }
});

/**
 * @desc Login user with given credentials
 * @param {username,password} body - body contains username and password
 * @returns {token} authorization token
 */
router.post("/login", validateSchema("signin"), function (req, res) {
    try {
        authService.signin(req.body);
    } catch (err) {
        logger.error(err);
        res.json(error("Something went wrong", 500));
    }
});
