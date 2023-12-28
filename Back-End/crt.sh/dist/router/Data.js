"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchData_1 = __importDefault(require("../utils/fetchData"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const search = req.query.search;
    const expired = req.query.exclude;
    try {
        const response = await (0, fetchData_1.default)(`https://crt.sh/?q=${search}&exclude=${expired}&output=json`);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.default = router;
