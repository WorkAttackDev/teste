"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneDayTimeout = void 0;
const oneDayTimeout = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
};
exports.oneDayTimeout = oneDayTimeout;
