"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../object_types/User"));
const constants_1 = require("../../util/constants");
const change_password_mutation_1 = require("./change_password.mutation");
const confirm_account_mutation_1 = __importDefault(require("./confirm_account.mutation"));
const create_email_login_mutation_1 = require("./create_email_login.mutation");
const email_login_mutation_1 = require("./email_login.mutation");
const forgot_password_mutation_1 = require("./forgot_password.mutation");
const login_mutation_1 = __importDefault(require("./login.mutation"));
const send_confirm_account_1 = require("./send_confirm_account");
const signup_mutation_1 = __importDefault(require("./signup.mutation"));
const types_1 = require("./types");
let UserResolver = class UserResolver {
    async me({ prisma, req }) {
        const userId = req.session.userId;
        if (!userId)
            return null;
        const user = await prisma.user.findFirst({ where: { id: userId } });
        return user !== null && user !== void 0 ? user : null;
    }
    async getUsers(ctx) {
        return ctx.prisma.user.findMany();
    }
    async signup(args, ctx) {
        return signup_mutation_1.default(args, ctx);
    }
    async sendConfirmAccount(email, ctx) {
        return await send_confirm_account_1.sendConfirmAccount(email.toLowerCase(), ctx);
    }
    async confirmAccount(token, ctx) {
        return confirm_account_mutation_1.default(token, ctx);
    }
    async login(args, ctx) {
        return login_mutation_1.default(args, ctx);
    }
    async createEmailLogin(email, ctx) {
        return await create_email_login_mutation_1.createEmailLogin(email.toLowerCase(), ctx);
    }
    async emailLogin(token, ctx) {
        return email_login_mutation_1.emailLogin(token, ctx);
    }
    async logout({ req, res }) {
        if (!req.session.userId)
            return false;
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    async forgotPassword(email, ctx) {
        return await forgot_password_mutation_1.forgotPassword(email.toLowerCase(), ctx);
    }
    async changePassword(args, ctx) {
        return change_password_mutation_1.changePassword(args, ctx);
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.default, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [User_1.default]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("args")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.SignUpInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendConfirmAccount", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmAccount", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("args")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.LogInInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createEmailLogin", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "emailLogin", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => types_1.UserResponse),
    __param(0, type_graphql_1.Arg("args")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ChangePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.default = UserResolver;
