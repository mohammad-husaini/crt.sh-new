import { DataSource } from "typeorm";
import { Subscribers } from "./entities/Subscribers";

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.USER_NAME,
    password: "",
    database: "cystack_db",
    entities: [Subscribers],
    logging: false,
    synchronize: true
});

export default dataSource