import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { InvestmentTypeEnum } from "../enums";

const createInvestment = Joi.object({
  name: stringSchema.label("Name").required(),
  type: stringSchema.label("Types").valid(...list(InvestmentTypeEnum)).required(),
  description : stringSchema.label("Description ").allow(null, ''),
  date: dateSchema.label('Date').required(),
});

const updateInvestment = Joi.object({
    name: stringSchema.label("Name"),
    type: stringSchema.label("Types").valid(...list(InvestmentTypeEnum)),
    description : stringSchema.label("Description "),
    date: dateSchema.label('Date'),
  });

export { createInvestment,updateInvestment };
