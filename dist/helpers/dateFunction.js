"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimestampInSeconds = void 0;
function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}
exports.getTimestampInSeconds = getTimestampInSeconds;
