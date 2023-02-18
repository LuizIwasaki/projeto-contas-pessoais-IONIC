import "reflect-metadata";
import { DataSource } from "typeorm";
import { createUser1663943193093 } from "./database/migrations/1663943193093-create_user";

import User from "./models/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db_aula",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [
    createUser1663943193093,
  ],
  subscribers: [],
});
