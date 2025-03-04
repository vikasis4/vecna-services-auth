import { IOTP } from "@/types/models/otp";
import mongoose, { Schema, Document } from "mongoose";

const OTPSchema: Schema<IOTP> = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 300 },
});

const OTPModel = mongoose.model<IOTP>("OTP", OTPSchema);

export default OTPModel;
