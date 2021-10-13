/**
 * @desc Send any success response
 * @param {string} message
 * @param {object | array} results
 * @param {number} statusCode
 */
exports.success = (res, message, results, statusCode) => {
    return res.status(statusCode).json({
        message,
        success: true,
        code: statusCode,
        results,
    });
};

/**
 * @desc Send any error response
 * @param {string} message
 * @param {number} statusCode
 */
exports.error = (res, message, statusCode) => {

    if (!statusCode) statusCode = 500;

    return res.status(statusCode).json({
        message: message.trim(),
        success: false,
        code: statusCode
    });
};
