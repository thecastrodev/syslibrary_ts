import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { authController } from "../bootstrap";
import { Request, Response, Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", async (request: Request, response: Response) => {
  const { status, body } = await authController.login(request);
  response.status(status).json(body);
});

authRoutes.get(
  "/verify",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await authController.verifyToken(request);
    response.status(status).json(body);
  }
);

authRoutes.post("/register", async (request: Request, response: Response) => {
  const { status, body } = await authController.register(request);
  response.status(status).json(body);
});

authRoutes.get(
  "/info",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await authController.info(request);
    response.status(status).json(body);
  }
);

authRoutes.patch(
  "/patch",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await authController.patch(request);
    response.status(status).json(body);
  }
);

authRoutes.delete(
  "/delete",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await authController.delete(request);
    response.status(status).json(body);
  }
);

export { authRoutes };