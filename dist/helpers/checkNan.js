"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNan = void 0;
function checkNan(value) {
    return isNaN(Number(value)) ? null : Number(value);
}
exports.checkNan = checkNan;
