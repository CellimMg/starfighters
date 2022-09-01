import * as fightersRepository from "../repositories/fighters_repository";

export async function ranking(): Promise<any[]> {
    try {
        const response: any[] = await fightersRepository.read();

        return response;
    } catch (error) {
        throw "UNEXPECTED";
    }
}