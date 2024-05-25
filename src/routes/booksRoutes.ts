import { Router } from "express";
import { bookController } from "../bootstrap";
import { Request, Response } from "express";
import { ensureAuthenticate } from "middlewares/ensureAuthenticate";

const bookRoutes = Router();

// register
bookRoutes.post(
  "/register",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await bookController.register(request);
    response.status(status).json(body);
  }
);

// list
bookRoutes.get("/list/", async (request: Request, response: Response) => {
  const { status, body } = await bookController.list(request);
  response.status(status).json(body);
});

// list
bookRoutes.get(
  "/listByUser/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await bookController.listByUser(request);
    response.status(status).json(body);
  }
);

// update
bookRoutes.patch(
  "/update/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await bookController.patch(request);
    response.status(status).json(body);
  }
);

// delete
bookRoutes.delete(
  "/delete/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { status, body } = await bookController.delete(request);
    response.status(status).json(body);
  }
);

// list books categories
bookRoutes.get("/categories/", async (request: Request, response: Response) => {
  const { status, body } = await bookController.listBooksCategories(request);
  response.status(status).json(body);
});

export { bookRoutes };