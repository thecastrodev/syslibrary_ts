import { Router } from "express";

import { startRoutes } from "./startRoutes";

const routes = Router();

routes.use("/", startRoutes);

export { routes };