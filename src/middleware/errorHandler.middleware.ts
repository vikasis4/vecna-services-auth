import statusMap from "@/utils/statusCodeMap";
import { Request, Response, NextFunction } from "express";

interface Error {
  status?: number;
  message: string;
  stack?: string;
  winner?: string;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errArray = err.message.split("@@");

  let message = err.message || "Internal Server Error";
  let statusCode = err.status || 500;
  let status = 0;

  if (errArray.length > 1) {
    message = errArray[1];
    status = parseInt(errArray[0]);
    statusCode = statusMap[status];
  }

  res.status(statusCode).json({
    status,
    message,
    winner: err.winner,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
