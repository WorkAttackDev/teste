"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = async ({ context }, next) => {
    if (!context.req.session.userId)
        throw new Error("não autênticado");
    return next();
};
exports.default = isAuth;
