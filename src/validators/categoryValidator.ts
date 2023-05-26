import Joi from "joi";
import { stringSchema } from "./schemas";
import {list} from "../utils";
import { CategoryTypeEnum } from "../enums";

const createCategory = Joi.object({
  title: stringSchema.label("Title").required(),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)).required(),

});

const updateCategory = Joi.object({
  title: stringSchema.label("Title"),
  type: stringSchema.label("Types").valid(...list(CategoryTypeEnum)),

  });

export { createCategory,updateCategory };