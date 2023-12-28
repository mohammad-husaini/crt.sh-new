"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchData = async (url) => {
    const res = await fetch(url);
    return await res.json();
};
exports.default = fetchData;
