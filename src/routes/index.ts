import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { authRoutes } from "./authRoutes";
import { bookRoutes } from "./booksRoutes";
import { bookingRoutes } from './bookingsRoutes';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const routes = Router();

routes.use("/", startRoutes);
routes.use('/auth', authRoutes);
routes.use('/books', bookRoutes /*
#swagger.tags = ['Book']
*/)
routes.use('/bookings', ensureAuthenticate, bookingRoutes /* 
#swagger.tags = ['Booking']
#swagger.security = [{
            "bearerAuth": []
    }]
*/)

export { routes };