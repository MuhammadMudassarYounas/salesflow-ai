import { Router } from "express";
import { userController } from "./user.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";
import { validate } from "../../common/middleware/validate.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { createUserSchema } from "./user.validation";
import { UserRole } from "../../common/constants/roles";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createUserSchema),
  asyncHandler(userController.create)
);

router.get(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(userController.getAll)
);

router.get(
  "/:id",
  authenticate,
 authorize(UserRole.ADMIN),
  asyncHandler(userController.getById)
);

router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(userController.update)
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(userController.delete)
);

export default router;