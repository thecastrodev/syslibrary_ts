import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";
import { bookRoutes } from "./booksRoutes";
import { bookingRoutes } from './bookingsRoutes';
import { authenticateRoutes } from "./authenticateRoutes";
import { ensureAuthenticate } from "middlewares/ensureAuthenticate";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/user", usersRoutes);
routes.use('/books', bookRoutes)
routes.use('/bookings', ensureAuthenticate, bookingRoutes)

routes.use("/session", authenticateRoutes);

export { routes };