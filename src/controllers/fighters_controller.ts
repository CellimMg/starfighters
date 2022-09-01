import { Request, Response } from "express";
import fighterSchema from "../schemas/fighter_schema";
import * as fightersService from "../services/fighters_service";

export async function battle(req: Request, res: Response) {
    try {
        console.log(req.body);
        const { firstUser, secondUser } = req.body;

        isValidFighters(firstUser, secondUser);

        const response = await fightersService.battle(firstUser, secondUser);

        return res.send(response);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

function isValidFighters(firstUser: string, secondUser: string) {
    const { error } = fighterSchema.validate({ firstUser, secondUser });
    if (error) throw "ERRO";
}