import Joi from "joi";
import {
  emailSchema,
  stringSchema,
} from "./schemas";

const signUp = Joi.object({
  fullName: stringSchema.label("Full Name").required(),
  email: emailSchema.label("Email").required(),
  gender: stringSchema.label("Gender").required(),
  password: stringSchema.label("Password").required(),
  // confirm_password: stringSchema.label('Confirm Password')
  // .not(Joi.ref('password')).label('Confirm Password')
  // .required(),
});

const login = Joi.object({
  email: emailSchema.label("Email").required().trim(),
  password: stringSchema.label("Password").required(),
});


const resendConfirmationCode = Joi.object({
  email: emailSchema.label("E-mail").required(),
});



const confirmForgotPassword = Joi.object({
  verification_code: stringSchema.label("Verification Code"),
  new_password: stringSchema.label("New Password"),
  email: emailSchema.label("Verification Code"),
});

const changePassword = Joi.object({
  old_password: stringSchema.label('Old Password').required(),
  new_password: stringSchema.label('New Password')
    .not(Joi.ref('old_password')).label('New Password')
    .required(),
});


const forgotPassword = Joi.object({
  email: emailSchema.label("Verification Code"),
});





export {
  signUp,
  resendConfirmationCode,
  confirmForgotPassword,
  forgotPassword,
  login,
  changePassword,
};
