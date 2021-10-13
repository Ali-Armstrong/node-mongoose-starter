const User = require("../models/users.model");

exports.onBoardUser = (user) => {

}

exports.isLinkAvailable = async (link) => {
    const users = await User.findOne({
        calendarLink : link
    }).lean().exec();
    if(users){
        return false;
    }
    return true;
}

exports.inviteUser = async (user) => {
    
}