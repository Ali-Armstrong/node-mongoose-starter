const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
const userService = require("../services/users.service");
const validateSchema = require("../utils/validator");

/**
 * SignUp/Onboard new user
 */
router.post("/", validateSchema('new-user'),function (req, res) {
    try{
        userService.onBoardUser(req.body);
    }catch(err){
        logger.error(err)
    }
});

/**
 * Get Existing User Details with unique userID
 */
router.get("/:id", function (req, res) {
    try{

    }catch(err){
        logger.error(err)
    }
});

module.exports = router;
