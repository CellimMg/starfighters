import { Request, Response } from "express";
import * as rankingService from "../services/ranking_service";

export async function ranking(req: Request, res: Response) {
    try {
        const response = await rankingService.ranking();
        return res.send({ fighters: response });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}