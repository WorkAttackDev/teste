"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../entities/User"));
const password_1 = require("../../util/password");
const user_validate_1 = require("./user.validate");
const login = async (args, ctx) => {
    const { email, password } = args;
    const { req } = ctx;
    const errors = user_validate_1.loginValidate(args);
    if (errors)
        return errors;
    const user = await User_1.default.findOne({ where: { email: email.toLowerCase() } });
    if (!user)
        return {
            errors: [{ field: "email", message: "email não encontrado" }],
        };
    if (!user.isVerified)
        return {
            errors: [{ field: "email", message: "email não verificado" }],
        };
    if (!(await password_1.passwordCompare(password, user.password)))
        return {
            errors: [{ field: "password", message: "password incorreta" }],
        };
    req.session.userId = user.id;
    return { user };
};
exports.default = login;
