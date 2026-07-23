import { UserDocument } from "../../modules/users/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export {};