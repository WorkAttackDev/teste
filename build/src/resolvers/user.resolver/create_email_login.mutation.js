"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailLogin = void 0;
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../../entities/User"));
const email_1 = require("../../libs/email");
const date_handler_1 = require("../../util/date_handler");
const user_validate_1 = require("./user.validate");
const createEmailLogin = async (email, ctx) => {
    const emailError = user_validate_1.hasEmailError(email);
    if (emailError)
        return false;
    const user = await User_1.default.findOne({ where: { email } });
    if (!user)
        return false;
    const token = uuid_1.v4();
    try {
        await User_1.default.update(user.id, {
            verifyToken: token,
            expireToken: date_handler_1.oneDayTimeout(),
        });
        await email_1.createEmailLoginEmail(email, token);
        return true;
    }
    catch (error) {
        console.log(error);
        return true;
    }
};
exports.createEmailLogin = createEmailLogin;
