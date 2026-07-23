import { Request, Response } from "express";
import { authService } from "./auth.service";
import { LoginInput } from "./validation/login.validation";

class AuthController {
  async login(req: Request, res: Response) {
    const data = req.body as LoginInput;

    const { token, user } = await authService.login(data);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
      },
    });
  }

  async logout(req: Request, res: Response) {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

export const authController = new AuthController();