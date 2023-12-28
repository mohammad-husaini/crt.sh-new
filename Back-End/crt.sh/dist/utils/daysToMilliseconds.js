"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daysToMilliseconds = (days) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return days * millisecondsPerDay;
};
exports.default = daysToMilliseconds;
