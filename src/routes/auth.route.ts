import express from "express";
import * as authController from "@/controller/auth.controller";
import * as authValidation from "@/validation/authValidation";
import handleTryCatch from "@/middleware/handleTryCatch.middleware";

const router = express.Router();

router.get(
  "/auth/v1/auth-check/verify-token",
  handleTryCatch((req: any, res: any) =>
    res.json(req.response(1, "success", req.user))
  )
);
router.post(
  "/auth/v1/key-check/register",
  authValidation.register,
  handleTryCatch(authController.register)
);
router.post(
  "/auth/v1/key-check/verify-otp",
  authValidation.verifyOtp,
  handleTryCatch(authController.verifyOtp)
);
router.post(
  "/auth/v1/key-check/login",
  authValidation.login,
  handleTryCatch(authController.login)
);
router.post(
  "/auth/v1/key-check/reset-otp",
  authValidation.sendForgotOtp,
  handleTryCatch(authController.sendResetOTP)
);
router.post(
  "/auth/v1/key-check/reset-password",
  authValidation.resetPassword,
  handleTryCatch(authController.resetPassword)
);
router.post("/auth/v1/auth-check/logout", handleTryCatch(authController.logout));

export default router;
