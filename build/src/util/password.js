"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.passwordCompare = void 0;
const bcrypt_1 = require("bcrypt");
const util_1 = require("util");
exports.passwordCompare = util_1.promisify(bcrypt_1.compare);
const hashPassword = async (password) => await util_1.promisify(bcrypt_1.hash)(password, 10);
exports.hashPassword = hashPassword;
