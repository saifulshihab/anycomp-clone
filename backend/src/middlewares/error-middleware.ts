import { Request, Response, NextFunction } from "express";
import { env } from "node:process";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = error.message || "Something went wrong";

  // Log error
  console.error(error);

  let errResponse;

  if (env.ENV === "production") {
    errResponse = {
      status: statusCode,
      message
    };
  } else {
    errResponse = {
      status: statusCode,
      message,
      stack: error.stack,
      error
    };
  }

  res.status(statusCode).json(errResponse);
};
