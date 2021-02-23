"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../entities/User"));
const confirmAccount = async (token, ctx) => {
    try {
        const user = await User_1.default.findOne({ where: { verifyToken: token } });
        const { req } = ctx;
        if (!user)
            return {
                errors: [
                    {
                        field: "token",
                        message: `Token inválido`,
                    },
                ],
            };
        await User_1.default.update(user.id, {
            isVerified: true,
            verifyToken: undefined,
            expireToken: new Date(),
        });
        req.session.userId = user.id;
        return { change: true };
    }
    catch (error) {
        console.log(error);
        return {
            errors: [
                {
                    field: "token",
                    message: `Erro ao confirmar usuário`,
                },
            ],
        };
    }
};
exports.default = confirmAccount;
