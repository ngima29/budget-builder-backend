import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { CashFlowTypeEnum } from "../enums";

const createCashFlow = Joi.object({
  categoryId : positiveIntegerSchema.label('Category  ID').required(),
  goalId : positiveIntegerSchema.label('Goal  ID').allow(null, ''),
  amount: positiveIntegerSchema.label("Amount").required(),
  description : stringSchema.label("Description ").allow(null, ''),
  date: dateSchema.label(' Date').required(),
  type: stringSchema.label("Types").valid(...list(CashFlowTypeEnum)).required(),
});

const updateCashFlow = Joi.object({
    categoryId : positiveIntegerSchema.label('Category  ID'),
    goalId : positiveIntegerSchema.label('Goal  ID'),
    amount: positiveIntegerSchema.label("Amount"),
    description : stringSchema.label("Description "),
    date: dateSchema.label(' Date'),
    type: stringSchema.label("Types").valid(...list(CashFlowTypeEnum)),
  });

export { createCashFlow,updateCashFlow };
