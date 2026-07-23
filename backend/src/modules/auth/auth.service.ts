import { authRepository } from "./auth.repository";
import { LoginInput } from "./validation/login.validation";
import { comparePassword } from "../../common/utils/password";
import { generateToken } from "../../common/utils/generateToken";
import { UnauthorizedError } from "../../common/errors/UnauthorizedError";

class AuthService {
    async login(data: LoginInput) {
        // Find user by email
        const user = await authRepository.findByEmail(data.email);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password");
        }

        // Ensure password exists
        if (!user.password) {
            throw new UnauthorizedError("Invalid email or password");
        }

        // Compare password
        const isPasswordValid = await comparePassword(
            data.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid email or password");
        }

        // Check account status
        if (!user.isActive) {
            throw new UnauthorizedError("Your account has been deactivated");
        }

        // Update last login
        await authRepository.updateLastLogin(String(user._id));

        // Generate JWT
        const token = generateToken({
            userId: String(user._id),
            role: user.role,
        });

        const { password, ...userResponse } = user.toObject();

        return {
            token,
            user: userResponse,
        };
    }
}

export const authService = new AuthService();