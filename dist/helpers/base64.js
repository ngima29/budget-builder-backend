"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64 = void 0;
class Base64 {
    static instance;
    constructor() { }
    static get() {
        if (!Base64.instance) {
            Base64.instance = new Base64();
        }
        return Base64.instance;
    }
    encode(payload) {
        return Buffer.from(payload).toString("base64");
    }
    decode(payload) {
        return JSON.parse(Buffer.from(payload, "base64").toString("ascii"));
    }
}
const base64 = Base64.get();
exports.Base64 = base64;
