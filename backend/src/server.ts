import "reflect-metadata";
import app from "./app";
import { ENV_VARS } from "./config/constant";
import { AppDataSource } from "./config/data-source";

const PORT = ENV_VARS.PORT;

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
    process.exit(1);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
