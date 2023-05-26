import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import {LoanStatusEnum, LoanTypeEnum } from "../enums";

const createLoan = Joi.object({
  amount: positiveIntegerSchema.label("Amount").required(),
  type: stringSchema.label("Types").valid(...list(LoanTypeEnum)).required(),
  description : stringSchema.label("Description ").required(),
  date: dateSchema.label('Date').required(),
  return_date: dateSchema.label('Return Date').required(),
  interestRate: positiveIntegerSchema.label("Interest Rate").allow(null),
  status:  stringSchema.label('Status').valid(...list(LoanStatusEnum)).required(),
});

const updateLoan = Joi.object({
    amount: positiveIntegerSchema.label("Amount"),
    type: stringSchema.label("Types").valid(...list(LoanTypeEnum)),
    description : stringSchema.label("Description "),
    date: dateSchema.label('Date'),
    return_date: dateSchema.label('Return Date'),
    interestRate: positiveIntegerSchema.label("Interest Rate") ,
    status:  stringSchema.label('Status').valid(...list(LoanStatusEnum)),
  });

export { createLoan,updateLoan };
