import { Router } from "express";
import * as rankingController from "../controllers/ranking_controller";

const rankingRoute = Router();

rankingRoute.get("/ranking", rankingController.ranking);

export default rankingRoute;