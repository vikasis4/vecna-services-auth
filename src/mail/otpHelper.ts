import { msgType } from "@/types/models/otp";
import nodemailer from "nodemailer";
import otpTemplate from "./templates/otpTemp";

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const msgTypeMap = {
  "reset-account-otp": "Your Vecna Password Reset OTP",
  "create-account-otp": "Your Vecna Account Creation OTP",
};

export const sendOTPEmail = async (
  email: string,
  otp: string,
  msgType: msgType
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Vecna Support" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: msgTypeMap[msgType],
    html: otpTemplate(otp),
  });
};
