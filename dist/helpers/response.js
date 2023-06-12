"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    static instance;
    constructor() { }
    static get() {
        if (!SuccessResponse.instance) {
            SuccessResponse.instance = new SuccessResponse();
        }
        return SuccessResponse.instance;
    }
    async send({ message, data, count }) {
        return {
            message,
            data,
            count,
        };
    }
}
const successResponse = SuccessResponse.get();
exports.SuccessResponse = successResponse;
