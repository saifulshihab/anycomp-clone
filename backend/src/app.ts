import express from "express";
import { errorHandler, notFound } from "./middlewares/error-middleware";
import router from "./routes/router";

const app = express();

process.on("unhandledRejection", (reason) => {
  const error = new Error(`Unhandled rejection. Reason: ${reason}`);
  throw error;
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the AnyComp Clone Server!");
});

app.use("/api", router);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
