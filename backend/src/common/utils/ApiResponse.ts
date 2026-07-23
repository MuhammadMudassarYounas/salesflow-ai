import { Response } from "express";

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(
    res: Response,
    message: string,
    data?: T
  ) {
    return this.success(res, message, data, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: unknown
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}