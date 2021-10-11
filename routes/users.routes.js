const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
const userService = require("../services/users.service");
const validateSchema = require("../utils/validator");

/**
 * @desc    Onboard new user
 * @param   {new-user} body
 */
router.post("/", validateSchema('new-user'),function (req, res) {
    try{
        userService.onBoardUser(req.body);
    }catch(err){
        logger.error(err)
    }
});

/**
 * @desc    Get Existing User Details with unique userID
 * @param   {id} id - a path param, which is unique user identifier
 */
router.get("/:id", function (req, res) {
    try{

    }catch(err){
        logger.error(err)
    }
});

/**
 * @desc    Check if calendar-name is already taken for calendar link
 * @param   {domain} domain - a path param, which is user given calendar link
 */
router.get("/isAvailable/:domain", function (req, res) {
    try{

    }catch(err){
        logger.error(err)
    }
});

module.exports = router;
