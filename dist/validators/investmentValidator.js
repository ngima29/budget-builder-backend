"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvestment = exports.createInvestment = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createInvestment = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name").required(),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.InvestmentTypeEnum)).required(),
    amount: schemas_1.positiveIntegerSchema.label("Amount").required(),
    remarks: schemas_1.stringSchema.label("Remarks ").allow(null, ''),
    date: schemas_1.dateSchema.label('Date').required(),
});
exports.createInvestment = createInvestment;
const updateInvestment = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name"),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.InvestmentTypeEnum)),
    amount: schemas_1.positiveIntegerSchema.label("Amount"),
    remarks: schemas_1.stringSchema.label("Remarks "),
    date: schemas_1.dateSchema.label('Date'),
});
exports.updateInvestment = updateInvestment;
