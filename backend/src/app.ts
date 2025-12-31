import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
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

// Cors setup
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "Too many request. Please try again later."
    }
  })
);

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
