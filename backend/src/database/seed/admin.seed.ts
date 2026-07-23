import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../../modules/users/user.model";
import { hashPassword } from "../../common/utils/password";
import { UserRole } from "../../common/constants/roles";
import connectDB from "../../config/db";

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@salesflow.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await hashPassword("Admin@123");

    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@salesflow.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
      isVerified: true,
    });

    console.log("🎉 Admin created successfully!");
    console.log("--------------------------------");
    console.log("Email: admin@salesflow.com");
    console.log("Password: Admin@123");
    console.log("--------------------------------");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();