const User = require("../models/users.model");
const Org = require("../models/org.model");
const cryptoUtils = require('../utils/cryptoUtils');
import { nanoid } from 'nanoid'
const restrictedDomains = [null, '', 'gmail.com'];

exports.signup = async (user) => {
    //check if user already exists
    const user = await User.findOne({
        email: user.email
    }).lean().exec();

    if(user){
        return "user already exists"
    }else{
        //generate password hash
        const hash = await cryptoUtils.generateHash(user.password);

        //create org if not exists
        const domain = user.email.split('@')[1];
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

        //add new user with org details
        const newUser = new User({
            name: user.name,
            email: user.email,
            userId: nanoid(),
            pass: hash,
            isActive: true,
            orgInfo: {
                orgId,
                orgName: domain,
            }
        });
        const resp = await newUser.save();
        return resp;
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
    const isValidPass = await cryptoUtils.verifyHash(user.password, userDetails.hash);
    if(isValidPass){
        //generate jwt token
    }
    return "Invalid Password"
}