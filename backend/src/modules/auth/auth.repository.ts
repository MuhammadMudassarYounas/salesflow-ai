import { User } from "../users/user.model";
import { IUser, UserDocument } from "../users/user.types";

class AuthRepository {
  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email }).select("+password");
  }

  async findById(id: string): Promise<UserDocument | null> {
    return User.findById(id);
  }

  async createUser(data: Partial<IUser>): Promise<UserDocument> {
    return User.create(data);
  }

  async updateLastLogin(userId: string) {
  return User.findByIdAndUpdate(
    userId,
    {
      lastLogin: new Date(),
    },
    {
      new: true, // Return the updated document
    }
  );
}
}

export const authRepository = new AuthRepository();