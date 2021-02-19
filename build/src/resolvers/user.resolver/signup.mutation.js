"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const user_validate_1 = require("./user.validate");
const uuid_1 = require("uuid");
const signup = async (args, ctx) => {
    const { prisma, req } = ctx;
    const { email, name, password } = args;
    const errors = user_validate_1.signupValidate(args);
    if (errors)
        return errors;
    const hashedPassword = await argon2_1.default.hash(password);
    const token = uuid_1.v4();
    let user = undefined;
    try {
        user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: name,
                role: 0,
                verifyToken: token,
            },
        });
    }
    catch (e) {
        if (e.code === "P2002")
            return {
                errors: [
                    {
                        field: "email",
                        message: `Este email já existe`,
                    },
                ],
            };
    }
    // await confirmAccountEmail(user.email, token);
    req.session.userId = user.id;
    return { user };
};
exports.default = signup;
