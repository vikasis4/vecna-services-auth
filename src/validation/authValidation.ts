import parseZodErrors from "@/utils/parseZodError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// -------------------- Register ----------------------------------------------------
export const register = (req: Request, res: Response, next: NextFunction) => {
  const schema = z
    .object({
      email: z.string().email("Inavalid Email format"),
      username: z
        .string()
        .min(5, "Username should have atleast 5 characters")
        .max(30, "Username should not exceed more than 30 characters"),
      password: z
        .string()
        .min(8, "Password should have atleast 8 characters")
        .max(30, "Password should not exceed more than 30 characters"),
    })
    .strict();

  const result = schema.safeParse(req.body);

  if (!result.success) {
    let message: string = parseZodErrors(result.error.errors);
    req.response(2, message);
    return;
  }

  next();
};

// -------------------- Login -------------------------------------------------------
export const login = (req: Request, res: Response, next: NextFunction) => {
  const schema = z
    .object({
      email: z.string().email("Invalid Email format"),
      keepSession: z.boolean(),
      password: z
        .string()
        .min(8, "Password should have atleast 8 characters")
        .max(30, "Password should have atleast 30 characters"),
    })
    .strict();

  const result = schema.safeParse(req.body);
  if (!result.success) {
    let message: string = parseZodErrors(result.error.errors);
    req.response(2, message);
    return;
  }

  next();
};

// -------------------- Verify OTP -------------------------------------------------------
export const verifyOtp = (req: Request, res: Response, next: NextFunction) => {
  const schema = z
    .object({
      email: z.string().email("Inavlid Email Format"),
      otp: z.string().min(6, "OTP should have atleast 6 digits"),
    })
    .strict();

  const result = schema.safeParse(req.body);

  if (!result.success) {
    let message: string = parseZodErrors(result.error.errors);
    req.response(2, message);
    return;
  }

  next();
};

// -------------------- Send Forgot Otp -------------------------------------------------------
export const sendForgotOtp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z
    .object({
      email: z.string().email("Invalid Email Format"),
    })
    .strict();

  const result = schema.safeParse(req.body);

  if (!result.success) {
    let message: string = parseZodErrors(result.error.errors);
    req.response(2, message);
    return;
  }

  next();
};

// -------------------- Reset Password -------------------------------------------------------
export const resetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z
    .object({
      email: z.string().email("Invalid Email Format"),
      confirmPassword: z.string().optional(),
      password: z
        .string()
        .min(8, "Password should have atleast 8 characters")
        .max(30, "Password should have atleast 30 characters"),
      otp: z.string().min(6, "OTP should have atleast 6 digits"),
    })
    .strict();

  const result = schema.safeParse(req.body);

  if (!result.success) {
    let message: string = parseZodErrors(result.error.errors);
    req.response(2, message);
    return;
  }

  next();
};
