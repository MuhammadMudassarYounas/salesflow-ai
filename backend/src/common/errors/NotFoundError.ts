import { ApiError } from "./ApiError";
// This class represents a "Not Found" error, which is a specific type of API error that occurs when a requested resource cannot be found.
export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}