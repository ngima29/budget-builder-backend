"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseData = void 0;
const enums_1 = require("../enums");
/**
 * This function formats success response.
 *
 * @param {Object} data
 * @param {String} statusText
 */
const successResponseData = ({ data, message = '', res, statusCode = enums_1.HttpStatusEnum.OK }) => {
    res.status(statusCode).json({
        success: true,
        message,
        statusCode,
        ...(data && { data })
    });
};
exports.successResponseData = successResponseData;
