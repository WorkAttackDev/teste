"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
const user_validate_1 = require("./user.validate");
const changePassword = async (args, ctx) => {
    var _a;
    const { password, token } = args;
    const { prisma, req } = ctx;
    const passwordError = user_validate_1.hasPasswordError(password);
    if (passwordError)
        return passwordError;
    const user = await prisma.user.findFirst({ where: { verifyToken: token } });
    const tokenTimeout = parseInt((_a = user === null || user === void 0 ? void 0 : user.expireToken) !== null && _a !== void 0 ? _a : "0");
    if (!user || tokenTimeout < Date.now()) {
        return {
            errors: [{ field: "token", message: "chave de recuperação já expirou" }],
        };
    }
    const hashedPassword = await argon2_1.default.hash(password);
    try {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                expireToken: "0",
                verifyToken: null,
            },
        });
        req.session.userId = updatedUser.id;
        return {
            user: updatedUser,
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
