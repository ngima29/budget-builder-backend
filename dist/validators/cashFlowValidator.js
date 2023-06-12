"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCashFlow = exports.createCashFlow = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createCashFlow = joi_1.default.object({
    categoryId: schemas_1.positiveIntegerSchema.label('Category  ID').required(),
    goalId: schemas_1.positiveIntegerSchema.label('Goal  ID').allow(null, ''),
    amount: schemas_1.positiveIntegerSchema.label("Amount").required(),
    remarks: schemas_1.stringSchema.label("Remarks ").allow(null, ''),
    date: schemas_1.dateSchema.label(' Date').required(),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.CategoryTypeEnum)).required(),
});
exports.createCashFlow = createCashFlow;
const updateCashFlow = joi_1.default.object({
    categoryId: schemas_1.positiveIntegerSchema.label('Category  ID'),
    goalId: schemas_1.positiveIntegerSchema.label('Goal  ID'),
    amount: schemas_1.positiveIntegerSchema.label("Amount"),
    remarks: schemas_1.stringSchema.label("Remarks "),
    date: schemas_1.dateSchema.label(' Date'),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.CategoryTypeEnum)),
});
exports.updateCashFlow = updateCashFlow;
