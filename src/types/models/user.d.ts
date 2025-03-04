import { Document } from "mongoose";

interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  hashPassword: () => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
  getToken: () => Promise<string>;
}

export default IUser;
