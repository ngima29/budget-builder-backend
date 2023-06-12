"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGoal = exports.createGoal = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const createGoal = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name").required(),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.GoalCategoryEnum)).required(),
    startDate: schemas_1.dateSchema.label('Start Date').required(),
    endDate: schemas_1.dateSchema.label('Ens Date').required(),
    totalAmount: schemas_1.positiveIntegerSchema.label("Interest Rate").required(),
    currentAmount: schemas_1.positiveIntegerSchema.label("Interest Rate").required(),
    remarks: schemas_1.stringSchema.label("Description ").allow(null, ''),
});
exports.createGoal = createGoal;
const updateGoal = joi_1.default.object({
    name: schemas_1.stringSchema.label("Name"),
    type: schemas_1.stringSchema.label("Types").valid(...(0, utils_1.list)(enums_1.GoalCategoryEnum)),
    startDate: schemas_1.dateSchema.label('Start Date'),
    endDate: schemas_1.dateSchema.label('Ens Date'),
    totalAmount: schemas_1.positiveIntegerSchema.label("Total Amount"),
    currentAmount: schemas_1.positiveIntegerSchema.label("Current Amount").required(),
    remarks: schemas_1.stringSchema.label("Description "),
});
exports.updateGoal = updateGoal;
