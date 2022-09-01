import { Router } from "express";
import * as fightersController from "../controllers/fighters_controller";

const battleRoute = Router();

battleRoute.post("/battle", fightersController.battle);


export default battleRoute;