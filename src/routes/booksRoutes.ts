import { Router } from "express";
import { BooksController } from "../controllers/BooksController";
// import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const booksRoutes = Router();

const controller = new BooksController();

// public routes
booksRoutes.get("/", controller.index);
booksRoutes.get("/:id", controller.show);

// private rotes
// booksRoutes.use(ensureAuthenticate);
booksRoutes.post("/", controller.create);
booksRoutes.put("/:id", controller.update);
booksRoutes.delete("/:id", controller.delete);

export { booksRoutes };