"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Subscribers_1 = require("./entities/Subscribers");
const dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER_NAME,
    password: "",
    database: "cystack_db",
    entities: [Subscribers_1.Subscribers],
    logging: false,
    synchronize: true
});
exports.default = dataSource;
