export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
}

export type msgType = "reset-account-otp" | "create-account-otp";
