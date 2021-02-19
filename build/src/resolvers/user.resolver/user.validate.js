"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.signupValidate = exports.hasEmailError = exports.hasPasswordError = void 0;
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const isLength_1 = __importDefault(require("validator/lib/isLength"));
const hasPasswordError = (password) => {
    if (!isLength_1.default(password, { min: 8 }))
        return {
            errors: [
                {
                    field: "password",
                    message: "A password precisa ter mais de 8 caractéres.",
                },
            ],
        };
    return null;
};
exports.hasPasswordError = hasPasswordError;
const hasEmailError = (email) => {
    if (!isEmail_1.default(email))
        return {
            errors: [{ field: "email", message: "email inválido" }],
        };
    return null;
};
exports.hasEmailError = hasEmailError;
const signupValidate = ({ name, email, password, }) => {
    if (name.length < 3)
        return {
            errors: [
                {
                    field: "name",
                    message: "O nome precisa ter mais de 3 caractéres.",
                },
            ],
        };
    const emailError = exports.hasPasswordError(email);
    if (emailError)
        return emailError;
    const passwordError = exports.hasPasswordError(password);
    if (passwordError)
        return passwordError;
    return null;
};
exports.signupValidate = signupValidate;
const loginValidate = ({ email, password, }) => {
    const emailError = exports.hasPasswordError(email);
    if (emailError)
        return emailError;
    const passwordError = exports.hasPasswordError(password);
    if (passwordError)
        return passwordError;
    return null;
};
exports.loginValidate = loginValidate;
