"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../entities/User"));
const deleteUser = async (userId, ctx) => {
    try {
        const result = await User_1.default.delete(userId);
        return { change: true };
    }
    catch (e) {
        console.log(e);
        return {
            errors: [
                { field: "user", message: "Ocorreu um erro ao apagar o usuário" },
            ],
        };
    }
};
exports.default = deleteUser;
