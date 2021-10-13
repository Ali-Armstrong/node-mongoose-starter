const crypto = require("crypto")

/**
 * @desc generate hash for the given string
 * @param {string} password 
 * @returns {hash:string}
 */
exports.generateHash  = async (password) => {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(12).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

/**
 * @desc verify given password hash matches to the hash passed to it
 * @param {string} password 
 * @param {string} hash 
 * @returns {boolean}
 */
exports.verifyHash = async (password, hash) => {
    return new Promise((resolve, reject) => {
        //split the hash to separate salt and hash key
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'))
        });
    })
}

/**
 * @desc Generate random token to be used as password reset token
 * @returns {string}
 */
exports.generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
}