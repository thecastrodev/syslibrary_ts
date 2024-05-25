import { Router } from "express";
import { bookingController } from "../bootstrap";
import { Request, Response } from "express";

const bookingRoutes = Router();

// register
bookingRoutes.post(
  "/register",
  async (request: Request, response: Response) => {
    const { status, body } = await bookingController.register(request);
    response.status(status).json(body);
  }
);

// list by user
bookingRoutes.get("/list", async (request: Request, response: Response) => {
  const { status, body } = await bookingController.listByUser(request);
  response.status(status).json(body);
});

export { bookingRoutes };