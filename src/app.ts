import express from "express";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the AnyComp Clone Server!");
});

export default app;
