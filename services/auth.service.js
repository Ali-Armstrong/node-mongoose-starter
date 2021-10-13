const User = require("../models/users.model");
const Org = require("../models/org.model");
const UserOrg = require("../models/user-org.model");
const cryptoUtils = require('../utils/cryptoUtils');
const { sign } = require("../utils/jwt");
const mongoose = require('mongoose');
const config = require("../config/index");
const restrictedDomains = [null, undefined, '', 'gmail.com'];
const logger = require('../utils/logger');

exports.signup = async (body) => {
    //check if user already exists
    const user = await User.findOne({
        email: body.email
    }).lean().exec();

    if(user){
        return "user already exists"
    }else{
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
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
            let role = null;
            if(!org){
                orgId = mongoose.Types.ObjectId().toString();
                const newOrg = new Org({
                    domain,
                    name: domain
                })
                await newOrg.save({ session });
                role = 'super-admin'
            }else{
                orgId = org.orgId
                role = 'read-only'
            }
            //add new user with org details
            const userId = mongoose.Types.ObjectId().toString();
            const newUser = new User({
                _id: userId,
                name: body.name || body.email,
                email: body.email,
                pass: hash,
                isActive: true
            });
            await newUser.save({ session });

            //add new User-org
            const newUserOrg = new UserOrg({
                userId,
                orgId,
                role,
                orgName: domain,
                userEmail: body.email,
                isActive: true
            })
            await newUserOrg.save({ session });
            await session.commitTransaction();
            //TODO: if he is a read-only user send email of approval to org super admin

            //generate jwt token
            const token = await sign({
                    userInfo: {
                        role,
                        orgId,
                        email: body.email,
                        orgName: domain
                    }
                },{
                    subject: userId
                }
            );
            return {
                role,
                token
            };
        }catch (err) {
            logger.error(err)
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}

exports.signin = async (user) => {
    //Get user details
    const userDetails = await User.findOne({
        email: user.email
    }).exec();

    if(!userDetails){
        return {
            message: "Invalid Email",
            code: 401
        }
    }
    
    //compare pasword hash
    const isValidPass = await cryptoUtils.verifyHash(user.password, userDetails.pass);
    if(isValidPass){
        //get org details
        const userOrg = await UserOrg.findOne({
            userId: userDetails._id
        }).lean().exec();

        if(!userOrg){
            return {
                message: "User doesn't have any org",
                code: 403
            }
        }
        userDetails.lastSignIn = Date.now();
        userDetails.save();
        //generate jwt token
        const token = await sign({
                userInfo: {
                    role: userOrg.role,
                    orgId: userOrg.orgId,
                    email: userDetails.email,
                    orgName: userOrg.orgName
                }
            },{
                subject: userDetails._id
            }
        );
        return {
            message: token,
            code: 200
        }
    }
    return {
        message: "Invalid Password",
        code: 401
    }
}

exports.recover = async (body) => {
    const user = await User.findOne({email: body.email}).exec();
    
    if(!user){
        return false
    }

    //Generate and set password reset token
    user.generatePasswordReset();

    //save updated user document with reset token and expiry added
    await user.save();
    const resetLink = `${config.auth.resetURI}?email=${body.email}&code=${user.resetPasswordToken}`;
    logger.info(resetLink)
    //TODO: send reset password email
    return true;
}

exports.validateRecoverToken = async ({email, token}) => {
    const user = await User.findOne({
        email,
        resetPasswordToken: token, 
        resetPasswordExpires: {$gt: Date.now()}
    }).lean().exec();
    //if token expired or invalid token
    if(!user){
        return false
    }
    return email;
}

exports.resetPassword = async (body) => {
    //validate the recover token
    const user = await User.findOne({
        email: body.email,
        resetPasswordToken: body.token, 
        resetPasswordExpires: {$gt: Date.now()}
    }).exec();

    //if token expired or invalid token
    if(!user){
        return false
    }

    //generate new hash
    const hash = await cryptoUtils.generateHash(body.password);

    //set the new password
    user.pass = hash
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    return true;
}