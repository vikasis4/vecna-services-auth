import { Request, Response } from "express";
import * as authService from "@/services/authService";

// ======================= Registers =================
export const register = async (req: Request, res: Response) => {
  const user = await authService.register(req);
  req.response(1, "OTP sent successfully", user);
};

// ======================= verifyOtp =================
export const verifyOtp = async (req: Request, res: Response) => {
  const token = await authService.verifyOtp(req);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    // maxAge: 1000 * 60 * 60 * 24,
  });
  req.response(1, "OTP verified successfully");
};

// ======================= Login =================
export const login = async (req: Request, res: Response) => {
  const { user, token } = await authService.login(req);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    ...(req.body.keepSession ? { maxAge: 1000 * 60 * 60 * 24 } : {}),
  });
  req.response(1, "Login successful", user);
};

// ======================= Logout =================
export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0) });
  req.response(1, "Logged out successful");
};

// ======================= Send Reset OTP =================
export const sendResetOTP = async (req: Request, res: Response) => {
  const isOtepSent = await authService.sendOtp(req, "reset-account-otp");
  isOtepSent
    ? req.response(1, "OTP sent successful", req.body.email)
    : req.response(2, "Failed to send OTP");
};

// ======================= Reset Password =================
export const resetPassword = async (req: Request, res: Response) => {
  await authService.resetPassword(req);
  req.response(1, "Password reset successfully");
};
