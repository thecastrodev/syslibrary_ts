import { Router } from "express";
import { StartController } from "../controllers/StartController";

const startRoutes = Router();

const controller = new StartController();

startRoutes.get("/", controller.show);

export { startRoutes };