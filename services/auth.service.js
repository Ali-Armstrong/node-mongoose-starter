const User = require("../models/users.model");
const Org = require("../models/org.model");
const cryptoUtils = require('../utils/cryptoUtils');
const { sign } = require("../utils/jwt");
const nanoid = require('../utils/nanoid');
const restrictedDomains = [null, undefined, '', 'gmail.com'];

exports.signup = async (body) => {
    //check if user already exists
    const user = await User.findOne({
        email: body.email
    }).lean().exec();

    if(user){
        return "user already exists"
    }else{
        //generate password hash
        const hash = await cryptoUtils.generateHash(body.password);

        //create org if not exists
        const domain = body.email.split('@')[1];
        if(restrictedDomains.includes(domain)){
            return "not allowed"
        }
        
        //check if org exists
        const org = await Org.findOne({
            domain
        }).lean().exec();

        let orgId = null;
        if(!org){
            orgId = nanoid();
            const newOrg = new Org({
                orgId,
                domain,
                name: domain
            })
            await newOrg.save();
        }else{
            orgId = org.orgId
        }
        const userId = nanoid();
        //add new user with org details
        const newUser = new User({
            userId,
            name: body.name || body.email,
            email: body.email,
            pass: hash,
            isActive: true,
            orgInfo: {
                orgId,
                orgName: domain,
            }
        });
        await newUser.save();
        //generate jwt token
        const token = await sign(
            {email: body.email},
            {subject: userId}
        );
        return token;
    }
}

exports.signin = async (user) => {
    //Get user details
    const userDetails = await User.findOne({
        email: user.email
    }).lean().exec();

    if(!userDetails){
        return "Invalid Email"
    }
    
    //compare pasword hash
    const isValidPass = await cryptoUtils.verifyHash(user.password, userDetails.pass);
    if(isValidPass){
        //generate jwt token
        const token = await sign(
            {email: user.email},
            {subject: userDetails.userId}
        );
        return token;
    }
    return "Invalid Password"
}