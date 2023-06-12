"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.createCategory = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createCategory = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name").required(),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.CategoryTypeEnum)).required(),
});
exports.createCategory = createCategory;
const updateCategory = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name"),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.CategoryTypeEnum)),
});
exports.updateCategory = updateCategory;
