import { DataSource } from "typeorm";
import { Media } from "../entity/media.entity";
import { PlatformFee } from "../entity/platform-fee.entity";
import { ServiceOffer } from "../entity/service-offer.entity";
import { Specialist } from "../entity/specialist.entity";
import { ENV_VARS } from "./constant";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV_VARS.DB_HOST,
  port: ENV_VARS.DB_PORT,
  username: ENV_VARS.DB_USER,
  password: ENV_VARS.DB_PASSWORD,
  database: ENV_VARS.DB_NAME,
  url: ENV_VARS.DB_URL,
  entities: [Specialist, Media, ServiceOffer, PlatformFee],
  synchronize: true,
  logging: false
});
