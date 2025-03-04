import { Response } from "express";
import responseType from "./utils/response";
import IUser from "./models/user";

declare module "express-serve-static-core" {
  interface Request {
    response: (
      status: number,
      message: string,
      data?: any,
      extraFields?: any
    ) => void;
    user?: IUser;
  }
}

export default {};
