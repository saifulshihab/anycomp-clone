import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { ENV_VARS } from "./config/constant";
import { AppDataSource } from "./config/data-source";

const PORT = ENV_VARS.PORT;

// Database connection
AppDataSource.initialize()
  .then((res) => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection failed!", err);
    process.exit(1);
  });

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Anycomp Clone server running on port ${PORT}`);
});

function shutdown() {
  console.log("Shutting down...");
  server.close(() => {
    console.log("Closed all connections.");
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
