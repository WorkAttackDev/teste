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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordInput = exports.LogInInput = exports.SignUpInput = exports.HasChangeResponse = exports.UserResponse = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../../entities/User"));
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.default, { nullable: true }),
    __metadata("design:type", User_1.default)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let HasChangeResponse = class HasChangeResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], HasChangeResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], HasChangeResponse.prototype, "change", void 0);
HasChangeResponse = __decorate([
    type_graphql_1.ObjectType()
], HasChangeResponse);
exports.HasChangeResponse = HasChangeResponse;
let SignUpInput = class SignUpInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SignUpInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SignUpInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SignUpInput.prototype, "password", void 0);
SignUpInput = __decorate([
    type_graphql_1.InputType()
], SignUpInput);
exports.SignUpInput = SignUpInput;
let LogInInput = class LogInInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LogInInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LogInInput.prototype, "password", void 0);
LogInInput = __decorate([
    type_graphql_1.InputType()
], LogInInput);
exports.LogInInput = LogInInput;
let ChangePasswordInput = class ChangePasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "password", void 0);
ChangePasswordInput = __decorate([
    type_graphql_1.InputType()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
