"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const User_1 = __importDefault(require("../../entities/User"));
const date_handler_1 = require("../../util/date_handler");
const password_1 = require("../../util/password");
const user_validate_1 = require("./user.validate");
const changePassword = async (args, ctx) => {
    const { password, token } = args;
    const { req } = ctx;
    const passwordError = user_validate_1.hasPasswordError(password);
    if (passwordError)
        return passwordError;
    const user = await User_1.default.findOne({ where: { verifyToken: token } });
    if (!user || date_handler_1.oneDayTimeout().getTime() < Date.now()) {
        return {
            errors: [{ field: "token", message: "chave de recuperação já expirou" }],
        };
    }
    const hashedPassword = await password_1.hashPassword(password);
    try {
        User_1.default.update(user.id, {
            password: hashedPassword,
            expireToken: new Date(),
            verifyToken: undefined,
        });
        req.session.userId = user.id;
        return {
            user: user,
        };
    }
    catch (e) {
        console.log(e);
        return {
            errors: [{ field: "token", message: "erro ao atualizar a password" }],
        };
    }
};
exports.changePassword = changePassword;
