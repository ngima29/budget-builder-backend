"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoan = exports.createLoan = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createLoan = joi_1.default.object({
    amount: schemas_1.positiveIntegerSchema.label("Amount").required(),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.LoanTypeEnum)).required(),
    remarks: schemas_1.stringSchema.label("Description ").required(),
    date: schemas_1.dateSchema.label('Date').required(),
    returnDate: schemas_1.dateSchema.label('Return Date').required(),
    interestRate: schemas_1.positiveIntegerSchema.label("Interest Rate").allow(null),
    status: schemas_1.stringSchema.label('Status').valid(...(0, utils_1.list)(enums_1.LoanStatusEnum)).required(),
});
exports.createLoan = createLoan;
const updateLoan = joi_1.default.object({
    amount: schemas_1.positiveIntegerSchema.label("Amount"),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.LoanTypeEnum)),
    remarks: schemas_1.stringSchema.label("Description "),
    date: schemas_1.dateSchema.label('Date'),
    returnDate: schemas_1.dateSchema.label('Return Date'),
    interestRate: schemas_1.positiveIntegerSchema.label("Interest Rate"),
    status: schemas_1.stringSchema.label('Status').valid(...(0, utils_1.list)(enums_1.LoanStatusEnum)),
});
exports.updateLoan = updateLoan;
