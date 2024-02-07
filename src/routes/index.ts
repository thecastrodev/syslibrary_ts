import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";
import { booksRoutes } from "./booksRoutes";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/user", usersRoutes);
routes.use("/book", booksRoutes);

export { routes };