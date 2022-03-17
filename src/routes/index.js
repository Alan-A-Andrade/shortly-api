import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import shortenerRouter from "./shortenerRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(shortenerRouter);

export default router;