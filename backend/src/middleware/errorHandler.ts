import { Request, Response } from "express";
interface ServerError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ServerError,
  req: Request,
  res: Response,
  next: Function
) => {
  const errorMessage = err.message ?? "Internal server error";
  const statusCode = err.statusCode ?? 500;
  if (!res.headersSent) {
    res.status(statusCode).send({
      status: statusCode,
      message: errorMessage,
    });
  }
};
