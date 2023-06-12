"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.login = exports.forgotPassword = exports.confirmForgotPassword = exports.resendConfirmationCode = exports.updateUser = exports.signUp = void 0;
const joi_1 = __importDefault(require("joi"));
const schemas_1 = require("./schemas");
const signUp = joi_1.default.object({
    fullName: schemas_1.stringSchema.label("Full Name").required(),
    email: schemas_1.emailSchema.label("Email").required(),
    gender: schemas_1.stringSchema.label("Gender").required(),
    password: schemas_1.stringSchema.label("Password").required(),
});
exports.signUp = signUp;
const updateUser = joi_1.default.object({
    fullName: schemas_1.stringSchema.label("Full Name"),
    email: schemas_1.emailSchema.label("Email"),
    gender: schemas_1.stringSchema.label("Gender"),
    password: schemas_1.stringSchema.label("Password"),
});
exports.updateUser = updateUser;
const login = joi_1.default.object({
    email: schemas_1.emailSchema.label("Email").required().trim(),
    password: schemas_1.stringSchema.label("Password").required(),
});
exports.login = login;
const resendConfirmationCode = joi_1.default.object({
    email: schemas_1.emailSchema.label("E-mail").required(),
});
exports.resendConfirmationCode = resendConfirmationCode;
const confirmForgotPassword = joi_1.default.object({
    verification_code: schemas_1.stringSchema.label("Verification Code"),
    new_password: schemas_1.stringSchema.label("New Password"),
    email: schemas_1.emailSchema.label("Verification Code"),
});
exports.confirmForgotPassword = confirmForgotPassword;
const changePassword = joi_1.default.object({
    oldPassword: schemas_1.stringSchema.label('Old Password').required(),
    newPassword: schemas_1.stringSchema.label('New Password')
        .not(joi_1.default.ref('old_password')).label('New Password')
        .required(),
});
exports.changePassword = changePassword;
const forgotPassword = joi_1.default.object({
    email: schemas_1.emailSchema.label("Verification Code"),
});
exports.forgotPassword = forgotPassword;
