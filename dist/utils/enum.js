"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
function list(enm) {
    const values = [];
    for (const key in enm) {
        values.push(enm[key]);
    }
    return values;
}
exports.list = list;
