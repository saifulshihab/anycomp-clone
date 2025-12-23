import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { ENV_VARS } from "./config/constant";
import { AppDataSource } from "./config/data-source";

const PORT = ENV_VARS.PORT;

const main = async () => {
  // Database connection
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
  } catch (err) {
    console.log("Database connection failed!", err);
    process.exit(1);
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Anycomp Clone server running on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
