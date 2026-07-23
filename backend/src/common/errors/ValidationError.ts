import { ApiError } from "./ApiError";

export class ValidationError extends ApiError {
  constructor(message = "Validation Error") {
    super(400, message);
  }
}