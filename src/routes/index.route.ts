import fs from "fs";
import path from "path";
import { Express } from "express";

type RouteModule = {
  default: (app: Express) => void;
};

const routes = async (app: Express) => {
  const files = fs.readdirSync(__dirname);

  const loadRoutes = async () => {
    try {
      for (const file of files) {
        if (!file.includes("index.route")) {
          const routePath = path.join(__dirname, file);
          const route: RouteModule = await import(routePath);
          app.use("/", route.default);
        }
      }
      return true;
    } catch (err) {
      console.error("Error loading routes:", err);
      return false;
    }
  };

  // Start loading routes asynchronously
  return await loadRoutes().catch((err) => {
    console.error("Error initializing routes:", err);
  });
};

export default routes;
