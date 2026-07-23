import { HydratedDocument, Types } from "mongoose";
import { UserRole } from "../../common/constants/roles";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  department?: string;

  role: UserRole;

  isActive: boolean;
  isVerified: boolean;

  lastLogin?: Date;

  createdBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;