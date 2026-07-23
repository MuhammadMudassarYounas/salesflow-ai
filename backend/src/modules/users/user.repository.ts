import { IUser } from "./user.types";
import { User } from "./user.model";

class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findAll() {
    return User.find().select("-password");
  }

  async create(data: Partial<IUser>) {
    return User.create(data);
  }

  async update(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");
  }

  async delete(id: string) {
    return User.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();