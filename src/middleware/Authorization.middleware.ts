import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserSchema from "@/models/user.models";
import response from "@/utils/response";
import IUser from "@/types/models/user";
import responseType from "@/types/utils/response";
import redisClient from "@/redis/redis";

const ValidApiKey = process.env.API_KEY || "";
const JwtKey = process.env.JWT_TOKEN_KEY || "";
const TokenVersion = process.env.JWT_TOKEN_VERSION || 1;

//===============================================================================================================
const Authorization: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Sample URL: https://localhost:8080/auth/v1/no-auth/users/fetcher

    const requestType = req.url.split("/")[3];
    req.response = response(res);
    if (requestType === "no-check") next();
    // _____________________________________________________________________
    else if (requestType === "key-check") {
      let isCorrect = apiKeyCheck(req);
      if (isCorrect) next();
    }
    // _____________________________________________________________________
    else if (requestType === "auth-check") {
      let isCorrect = apiKeyCheck(req);
      if (isCorrect) await validateToken(req, res, next);
    }
    // _____________________________________________________________________
    else req.response(4, "Wrong API Call");

    return;
  } catch (error: any) {
    console.log(error);
    req.response(0, error.message, error);
    return;
  }
};

//===============================================================================================================
async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const respFunc = (
      respType: "noToken" | "noSession" | "noUser" | "noAccess"
    ) => req.response(3, resp[respType]);

    const resp = {
      noToken: "Authorization token not provided",
      noSession: "Session expired! please login again",
      noUser: "User not found, login again",
      noAccess: "This account is temporarily suspended",
    };

    let token = req.headers.authorization || req.cookies.token;
    if (!token) return respFunc("noToken");

    let decode: any = await jwt.verify(token, JwtKey);
    if (decode.token_version != TokenVersion) return respFunc("noSession");

    let account;
    const cachedUser = await redisClient.hgetall(`user:${decode.id}`);

    if (!cachedUser || Object.keys(cachedUser).length == 0) {
      account = await UserSchema.findById(decode.id)
        .select("-password -__v")
        .lean();

      if (!account) return respFunc("noUser");
      if (!account.isActive) return respFunc("noAccess");
      await redisClient.hset(`user:${decode.id}`, account);
    } else {
      account = cachedUser as unknown as IUser;
    }

    redisClient.expire(`user:${decode.id}`, 300);

    req.user = { ...account } as unknown as IUser;

    return next();
  } catch (error) {
    console.log(error);

    return req.response(3, "Invalid authorization token");
  }
}

//===============================================================================================================
function apiKeyCheck(req: Request) {
  const apiKey = req.headers.apikey;

  if (apiKey && apiKey === ValidApiKey) return true;
  throw new Error("Wrong API key provided");
}

export default Authorization;
