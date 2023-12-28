"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dataSources_js_1 = __importDefault(require("./db/dataSources.js"));
const Subscribers_js_1 = __importDefault(require("./router/Subscribers.js"));
const Data_js_1 = __importDefault(require("./router/Data.js"));
const cronEveryTimeServerRestart_js_1 = __importDefault(require("./utils/cronEveryTimeServerRestart.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 5000;
app.use('/data', Data_js_1.default);
app.use('/subscribe', Subscribers_js_1.default);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    dataSources_js_1.default
        .initialize()
        .then(() => {
        console.log("connected to DB");
        (0, cronEveryTimeServerRestart_js_1.default)();
    })
        .catch((error) => {
        console.log("error: ", error);
    });
});
