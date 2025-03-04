import path from "path";
import { configDotenv } from "dotenv";
configDotenv();
import moduleAlias from "module-alias";

const prod = process.env.NODE_ENV === "production";
const rootPath = prod
  ? path.resolve(__dirname, "..","dist")
  : path.resolve(__dirname, ".");

moduleAlias.addAliases({
  "@": rootPath,
});
