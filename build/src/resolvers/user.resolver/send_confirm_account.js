"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmAccount = void 0;
const uuid_1 = require("uuid");
const email_1 = require("../../libs/email");
const user_validate_1 = require("./user.validate");
const sendConfirmAccount = async (email, ctx) => {
    const { prisma } = ctx;
    const emailError = user_validate_1.hasEmailError(email);
    if (emailError)
        return false;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return false;
    const token = uuid_1.v4();
    const oneDay = Date.now() + 1000 * 60 * 60 * 24 + "";
    try {
        await prisma.user.update({
            where: { email },
            data: { verifyToken: token, expireToken: oneDay },
        });
        await email_1.confirmAccountEmail(email, token);
        return true;
    }
    catch (error) {
        console.log(error);
        return true;
    }
};
exports.sendConfirmAccount = sendConfirmAccount;
