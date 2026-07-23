import { IUser } from "../users/user.types";

export interface IAuthRepository {
  findByEmail(email: string): Promise<IUser | null>;

  findById(id: string): Promise<IUser | null>;

  createUser(data: Partial<IUser>): Promise<IUser>;

  updateLastLogin(userId: string): Promise<void>;
}