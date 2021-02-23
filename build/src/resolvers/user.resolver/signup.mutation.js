"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { confirmAccountEmail } from "../../libs/email";
const User_1 = __importDefault(require("../../entities/User"));
const user_validate_1 = require("./user.validate");
const uuid_1 = require("uuid");
const password_1 = require("../../util/password");
const date_handler_1 = require("../../util/date_handler");
const signup = async (args, ctx) => {
    const { req } = ctx;
    const { email, name, password } = args;
    const errors = user_validate_1.signupValidate(args);
    if (errors)
        return errors;
    let hashedPassword = await password_1.hashPassword(password);
    const token = uuid_1.v4();
    try {
        const user = await User_1.default.create({
            email,
            password: hashedPassword,
            role: 0,
            name,
            verifyToken: token,
            expireToken: date_handler_1.oneDayTimeout(),
        }).save();
        // await confirmAccountEmail(user.email, token);
        req.session.userId = user.id;
        return { user };
    }
    catch (e) {
        // console.log(e);
        // if (e.code === "P2002")
        if (e.code === "SQLITE_CONSTRAINT")
            return {
                errors: [
                    {
                        field: "email",
                        message: `Este email já existe`,
                    },
                ],
            };
    }
    return {
        errors: [
            {
                field: "user",
                message: `Não foi possivel criar o usuário`,
            },
        ],
    };
};
exports.default = signup;
