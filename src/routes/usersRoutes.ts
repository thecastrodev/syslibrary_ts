import { Router } from "express";
import { UsersController } from "../controllers/UserController";
// import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const controller = new UsersController();

// public routes
usersRoutes.post("/", controller.create);

// private rotes
// usersRoutes.use(ensureAuthenticate);
usersRoutes.get("/", controller.index);
usersRoutes.get("/:id", controller.show);
usersRoutes.put("/:id", controller.update);
usersRoutes.delete("/:id", controller.delete);

export { usersRoutes };