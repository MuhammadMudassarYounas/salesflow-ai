import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../common/middleware/validate.middleware";
import { loginSchema } from "./validation/login.validation";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();


// Protected route
router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/logout",
  authController.logout
);

export default router;