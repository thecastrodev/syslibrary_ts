import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";
import { booksRoutes } from "./booksRoutes";
import { authenticateRoutes } from "./authenticateRoutes";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/user", usersRoutes);
routes.use("/book", booksRoutes);
routes.use("/session", authenticateRoutes);

export { routes };