import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import IUser from "@/types/models/user";
import jwt from "jsonwebtoken";

const JwtKey = process.env.JWT_TOKEN_KEY || "";
const token_version = process.env.JWT_TOKEN_VERSION || "1";

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Custom Methods
UserSchema.methods.hashPassword = async function (): Promise<void> {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  await this.save();
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getToken = async function () {
  const token = jwt.sign({ id: this._id, token_version }, JwtKey);
  return token;
};

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
