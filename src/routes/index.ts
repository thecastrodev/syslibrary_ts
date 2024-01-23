import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/user", usersRoutes);

export { routes };