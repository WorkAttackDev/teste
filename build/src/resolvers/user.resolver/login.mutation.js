"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const user_validate_1 = require("./user.validate");
const login = async (args, ctx) => {
    const { email, password } = args;
    const { prisma, req } = ctx;
    const errors = user_validate_1.loginValidate(args);
    if (errors)
        return errors;
    const user = await prisma.user.findFirst({
        where: {
            email: email.toLowerCase(),
        },
    });
    if (!user)
        return {
            errors: [{ field: "email", message: "email não encontrado" }],
        };
    if (!user.isVerified)
        return {
            errors: [{ field: "email", message: "email não verificado" }],
        };
    if (!(await argon2_1.default.verify(user.password, password)))
        return {
            errors: [{ field: "password", message: "password incorreta" }],
        };
    req.session.userId = user.id;
    return { user };
};
exports.default = login;
