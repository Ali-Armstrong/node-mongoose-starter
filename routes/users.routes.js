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
router.get("/isAvailable/:link", function (req, res) {
    try{
        if(userService.isLinkAvailable(req.params.link)){
            return res.json(success("ok", {available : true}, 200));
        }
        return res.json(success("ok", {available : false}, 200));
    }catch(err){
        logger.error(err);
        return res.json(error("Something went wrong", 500));
    }
});

module.exports = router;
