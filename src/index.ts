require("dotenv").config();
import "./moduleAlias";
import express from "express";
import Authorization from "./middleware/Authorization.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index.route";
import connectToDatabase from "./database/index.db";
import errorHandler from "./middleware/errorHandler.middleware";
import * as customTypes from "@/types/index";
import redisClient from "./redis/redis";
import path from "path";
 
connectToDatabase();

const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(Authorization);

(async () => {
  const isInitiated = await routes(app);
  if (isInitiated) app.use(errorHandler);
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
