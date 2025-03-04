import OTPModel from "@/models/otp.models";
import UserModel from "@/models/user.models";
import { msgType } from "@/types/models/otp";
import { generateOTP, sendOTPEmail } from "@/mail/otpHelper";
import { Request } from "express";

// =================== Register =================================
export const register = async (req: Request) => {
  const userExsists = await UserModel.findOne({
    email: req.body.email,
    isDeleted: false,
  });
  if (userExsists && userExsists.isVerified)
    throw new Error("2@@Email already exists");

  let user;
  if (userExsists) {
    user = userExsists;
    user.password = req.body.password;
    user.username = req.body.username;
  } else {
    user = await UserModel.create(req.body);
  }

  await user.hashPassword();
  await user.save();

  await sendOtp(req, "create-account-otp");
  const returnObj = { ...user.toObject() } as any;
  delete returnObj.password;
  return returnObj;
};

// =================== Login =========================
export const login = async (req: Request) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    isDeleted: false,
  }).select("-__v");
  if (!user)
    throw new Error("4@@No account found with email " + req.body.email);

  if (!user.isVerified)
    throw new Error(
      "3@@Account is not verified, Go on signup page and verify it"
    );
  if (!user.isActive) throw new Error("3@@Account is disabled");

  const isPasswordValid = await user.comparePassword(req.body.password);
  if (!isPasswordValid) throw new Error("3@@Wrong password");

  const token = await user.getToken();
  const returnObj = { ...user.toObject() } as any;
  delete returnObj.password;
  return { user: returnObj, token };
};

// =================== Reset Password =========================
export const resetPassword = async (req: Request) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email, isDeleted: false });
  if (!user) throw new Error("4@@User not found");
  await verifyOtp(req);

  user.password = password;
  await user.save();
  await user.hashPassword();

  return true;
};

// =================== Send OTP =========================
export const sendOtp = async (req: Request, msgType: msgType) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user)
    throw new Error("4@@No account found with email " + req.body.email);

  const otp = generateOTP();
  await OTPModel.create({
    email: req.body.email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  // await sendOTPEmail(req.body.email, otp, msgType);
  return true;
};

// =================== Verify OTP =========================
export const verifyOtp = async (req: Request) => {
  const otp = await OTPModel.findOne({
    email: req.body.email,
    otp: req.body.otp,
  });
  if (!otp) throw new Error("3@@Invalid OTP");
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) throw new Error("3@@User not found");
  const token = await user.getToken();
  user.isVerified = true;
  await user.save();
  await OTPModel.deleteMany({ email: req.body.email });
  return token;
};
