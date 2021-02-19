"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confirmAccount = async (token, ctx) => {
    const { prisma } = ctx;
    try {
        const user = await prisma.user.update({
            data: { isVerified: true, verifyToken: "", expireToken: "0" },
            where: { verifyToken: token },
        });
        if (!user)
            return {
                errors: [
                    {
                        field: "token",
                        message: `Token inválido`,
                    },
                ],
            };
        // req.session.userId = user.id;
        return { user };
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
