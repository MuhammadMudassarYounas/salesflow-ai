import { Router } from "express";
import { customerController } from "./customer.controller";
import { authenticate } from "../../../common/middleware/auth.middleware";
import { authorize } from "../../../common/middleware/role.middleware";
import { validate } from "../../../common/middleware/validate.middleware";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { createCustomerSchema } from "./customer.validation";
import { UserRole } from "../../../common/constants/roles";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.MANAGER),
  validate(createCustomerSchema),
  asyncHandler(customerController.create)
);

router.get(
  "/",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.MANAGER, UserRole.SALES),
  asyncHandler(customerController.getAll)
);

router.get(
  "/:id",
  authenticate,
 authorize(UserRole.ADMIN, UserRole.MANAGER, UserRole.SALES),
  asyncHandler(customerController.getById)
);

router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.MANAGER),
  asyncHandler(customerController.update)
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  asyncHandler(customerController.delete)
);

export default router;