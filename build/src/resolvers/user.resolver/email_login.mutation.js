"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLogin = void 0;
const emailLogin = async (token, ctx) => {
    var _a;
    const { prisma, req } = ctx;
    const user = await prisma.user.findFirst({ where: { verifyToken: token } });
    const tokenTimeout = parseInt((_a = user === null || user === void 0 ? void 0 : user.expireToken) !== null && _a !== void 0 ? _a : "0");
    if (!user || tokenTimeout < Date.now()) {
        return {
            errors: [{ field: "token", message: "chave de recuperação já expirou" }],
        };
    }
    if (!user.isVerified)
        return {
            errors: [{ field: "email", message: "email não verificado" }],
        };
    try {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                expireToken: "0",
                verifyToken: null,
            },
        });
        // req.session.userId = updatedUser.id;
        return {
            user: updatedUser,
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
