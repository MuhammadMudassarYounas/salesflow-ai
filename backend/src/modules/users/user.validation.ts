import { z } from "zod";
import { UserRole } from "../../common/constants/roles";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2).max(50),

  lastName: z.string().trim().min(2).max(50),

  email: z.string().trim().email().toLowerCase(),

  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),

  role: z.nativeEnum(UserRole),

  phone: z.string().optional(),

  department: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;