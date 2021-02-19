"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailLoginEmail = exports.forgotPasswordEmail = exports.confirmAccountEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const confirmAccountHtml = (token) => `
  <h1>Confirme o seu email para poder fazer o iniciar sessão</h1>
  <a href="http://localhost:3000/confirm-account/${token}">click aqui para confirmar o seu email</a>
`;
const forgotPasswordHtml = (token) => `
  <h1>Clique no link a baixo para poder alterar a palavra-passe</h1>
  <a href="http://localhost:3000/forgot-password/${token}">click aqui para redefinir a sua password</a>
`;
const createEmailLoginHtml = (token) => `
  <h1>Clique no link abaixo para iniciar sessão.</h1>
  <a href="http://localhost:3000/email-login/${token}">click aqui para iniciar-sessão</a>
`;
const createTransport = async () => nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "x7avfjn6fos4gfqb@ethereal.email",
        pass: "JH5haZAB9uXf4mXmc9",
    },
});
const confirmAccountEmail = async (to, token) => {
    const transporter = await createTransport();
    const info = await transporter.sendMail({
        from: '"WorkAttack-noreply" <foo@example.com>',
        to,
        subject: "Confirmar Conta",
        html: confirmAccountHtml(token),
    });
    console.log("Mensagem enviada: %s", info.messageId);
    console.log("Link de Previsualização: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.confirmAccountEmail = confirmAccountEmail;
const forgotPasswordEmail = async (to, token) => {
    const transporter = await createTransport();
    const info = await transporter.sendMail({
        from: '"WorkAttack-noreply" <foo@example.com>',
        to,
        subject: "Recuperar a palavra-passe",
        html: forgotPasswordHtml(token),
    });
    console.log("Mensagem enviada: %s", info.messageId);
    console.log("Link de Previsualização: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.forgotPasswordEmail = forgotPasswordEmail;
const createEmailLoginEmail = async (to, token) => {
    const transporter = await createTransport();
    const info = await transporter.sendMail({
        from: '"WorkAttack-noreply" <foo@example.com>',
        to,
        subject: "Iniciar sessão com email",
        html: createEmailLoginHtml(token),
    });
    console.log("Mensagem enviada: %s", info.messageId);
    console.log("Link de Previsualização: %s", nodemailer_1.default.getTestMessageUrl(info));
};
exports.createEmailLoginEmail = createEmailLoginEmail;
