/**
 * @desc Send any success response
 * @param {string} message
 * @param {object | array} results
 * @param {number} statusCode
 */
exports.success = (message, results, statusCode) => {
    return {
        message,
        success: true,
        code: statusCode,
        results,
    };
};

/**
 * @desc Send any error response
 * @param {string} message
 * @param {number} statusCode
 */
exports.error = (message, statusCode) => {

    if (!statusCode) statusCode = 500;

    return {
        message,
        success: false,
        code: statusCode
    };
};
