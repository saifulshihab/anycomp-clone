import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middlewares/error-middleware";
import router from "./routes/router";

const app = express();

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled rejection. Reason: ${reason}`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception", err);
  process.exit(1);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors setup
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the AnyComp Clone Server!");
});

app.use("/api", router);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
