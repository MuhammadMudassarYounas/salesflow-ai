import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import crmRoutes from "../modules/crm/crm.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/crm", crmRoutes);

export default router;