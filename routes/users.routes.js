const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
const userService = require("../services/users.service");
const { success, error } = require("../utils/responses");
const validateSchema = require("../utils/validator");

/**
 * @desc    Onboard new user
 * @param   {new-user} body
 */
router.post("/onboard", validateSchema("new-user"), function (req, res) {
    try {
        userService.onBoardUser(req.body);
    } catch (err) {
        logger.error(err);
    }
});

/**
 * @desc    Get Existing User Details with unique userID
 * @param   {id} id - a path param, which is unique user identifier
 */
router.get("/:id", function (req, res) {
    try {
    } catch (err) {
        logger.error(err);
    }
});

/**
 * @desc    Check if calendar-name is already taken for calendar link
 * @param   {domain} domain - a path param, which is user given calendar link
 */
router.get("/is-available/:link", function (req, res) {
    try {
        if (userService.isLinkAvailable(req.params.link)) {
            return success(res, "ok", { available: true }, 200);
        }
        return success(res, "ok", { available: false }, 200);
    } catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

router.post("/invite/new", function (req, res) {
    try {
        
        return success(res, "ok", { available: false }, 200);
    } catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

router.post("/invite/verify", function (req, res) {
    try {
        
        return success(res, "ok", { available: false }, 200);
    } catch (err) {
        logger.error(err);
        return error(res, "Something went wrong", 500);
    }
});

module.exports = router;
