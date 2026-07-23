import { userRepository } from "./user.repository";
import { CreateUserDto } from "./user.validation";
import { hashPassword } from "../../common/utils/password";
import { ValidationError } from "../../common/errors/ValidationError";
import { NotFoundError } from "../../common/errors/NotFoundError";

class UserService {
  async create(data: CreateUserDto) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ValidationError("Email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // Remove password
    const { password, ...userResponse } = user.toObject();

    return userResponse;
  }

  async getAll() {
    const users = await userRepository.findAll();

    return users.map((user) => {
      const { password, ...userResponse } = user.toObject();
      return userResponse;
    });
  }

  async getById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { password, ...userResponse } = user.toObject();

    return userResponse;
  }

  async update(id: string, data: Partial<CreateUserDto>) {
    // Hash password if updating it
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    const user = await userRepository.update(id, data);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { password, ...userResponse } = user.toObject();

    return userResponse;
  }

  async delete(id: string) {
    const user = await userRepository.delete(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      message: "User deleted successfully",
    };
  }
}

export const userService = new UserService();