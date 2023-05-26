import Joi from "joi";
import { stringSchema,positiveIntegerSchema, dateSchema } from "./schemas";
import {list} from "../utils";
import { GoalCategoryEnum } from "../enums";

const createGoal = Joi.object({
  name: stringSchema.label("Name").required(),
  type: stringSchema.label("Types").valid(...list(GoalCategoryEnum)).required(),
  start_date: dateSchema.label('Start Date').required(),
  end_date: dateSchema.label('Ens Date').required(),
  total_amount: positiveIntegerSchema.label("Interest Rate").required(),
  description : stringSchema.label("Description ").allow(null, ''),
});

const updateGoal = Joi.object({
  name: stringSchema.label("Name"),
  type: stringSchema.label("Types").valid(...list(GoalCategoryEnum)),
  start_date: dateSchema.label('Start Date'),
  end_date: dateSchema.label('Ens Date'),
  total_amount: positiveIntegerSchema.label("Interest Rate"),
  description : stringSchema.label("Description "),
  });

export { createGoal,updateGoal };
