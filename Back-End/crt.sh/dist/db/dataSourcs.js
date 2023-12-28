import { DataSource } from "typeorm";
import { Subscribers } from "./entities/subscribers";
const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER_NAME,
  password: "",
  database: "GSG_DATABASE",
  entities: [Subscribers],
  logging: true,
  synchronize: true,
});
export default dataSource;
