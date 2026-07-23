import jwt from "jsonwebtoken";
import { UserRole } from "../constants/roles";

interface JwtPayload {
  userId: string;
  role: UserRole;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};