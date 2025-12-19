import { DataSource } from "typeorm";
import { Specialist } from "../entity/specialist";
import { ENV_VARS } from "./constant";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: ENV_VARS.DB_HOST,
  // port: ENV_VARS.DB_PORT,
  // username: ENV_VARS.DB_USER,
  // password: ENV_VARS.DB_PASSWORD,
  // database: ENV_VARS.DB_NAME,
  url: ENV_VARS.DB_URL,
  entities: [Specialist],
  synchronize: true,
  logging: false
});
