import { ApiError } from "./ApiError";
// This class represents a "Validation" error, which is a specific type of API error that occurs when the input data fails validation checks.
export class ValidationError extends ApiError {
  constructor(message = "Validation Error") {
    super(400, message);
  }
}