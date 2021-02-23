"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLogin = void 0;
const User_1 = __importDefault(require("../../entities/User"));
const emailLogin = async (token, ctx) => {
    const { req } = ctx;
    const user = await User_1.default.findOne({ where: { verifyToken: token } });
    if (!user || user.expireToken.getTime() < Date.now()) {
        return {
            errors: [{ field: "token", message: "chave de recuperação já expirou" }],
        };
    }
    if (!user.isVerified)
        return {
            errors: [{ field: "email", message: "email não verificado" }],
        };
    try {
        await User_1.default.update(user.id, {
            expireToken: Date.now(),
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
            errors: [{ field: "token", message: "erro ao fazer login" }],
        };
    }
};
exports.emailLogin = emailLogin;
