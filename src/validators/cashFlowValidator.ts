import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { CategoryTypeEnum } from "../enums";

const createCashFlow = Joi.object({
  category : stringSchema.label('Category').required(),
  goal : stringSchema.label('Goal ').allow(null, ''),
  amount: positiveIntegerSchema.label("Amount").required(),
  remarks : stringSchema.label("Remarks ").allow(null, ''),
  date: dateSchema.label(' Date').required(),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)).required(),
});

const updateCashFlow = Joi.object({
    category : stringSchema.label('Category').required(),
    goal : stringSchema.label('Goal ').allow(null, ''),
    amount: positiveIntegerSchema.label("Amount"),
    remarks : stringSchema.label("Remarks "),
    date: dateSchema.label(' Date'),
    type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)),
  });

export { createCashFlow,updateCashFlow };
