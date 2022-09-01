import axios from "axios";
import * as fightersRepository from "../repositories/fighters_repository";

export async function battle(firstUser: string, secondUser: string) {
    try {
        const firstFighterRepos = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        const secondFighterRepos = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

        let firstFighterStars: number = 0;
        let secondFighterStars: number = 0;

        firstFighterRepos.data.forEach((element: { [x: string]: number; }) => {
            firstFighterStars += element["stargazers_count"];
        });

        secondFighterRepos.data.forEach((element: { [x: string]: number; }) => {
            secondFighterStars += element["stargazers_count"];
        });

        const firstFighterData: { [x: string]: number } = await fightersRepository.readByUserName(firstUser);
        const secondFighterData: { [x: string]: number } = await fightersRepository.readByUserName(secondUser);

        if (firstFighterData) {
            await fightersRepository.update(
                firstUser,
                firstFighterStars > secondFighterStars ? firstFighterData["wins"] + 1 : firstFighterData["wins"],
                firstFighterStars < secondFighterStars ? firstFighterData["losses"] + 1 : firstFighterData["losses"],
                firstFighterStars == secondFighterStars ? firstFighterData["draws"] + 1 : firstFighterData["draws"]);
        } else {
            await fightersRepository.create(
                firstUser,
                firstFighterStars > secondFighterStars ? 1 : 0,
                firstFighterStars < secondFighterStars ? 1 : 0,
                firstFighterStars == secondFighterStars ? 1 : 0);
        }

        if (secondFighterData) {
            await fightersRepository.update(
                secondUser,
                secondFighterStars > firstFighterStars ? secondFighterData["wins"] + 1 : secondFighterData["wins"],
                secondFighterStars < firstFighterStars ? secondFighterData["losses"] + 1 : secondFighterData["losses"],
                secondFighterStars == firstFighterStars ? secondFighterData["draws"] + 1 : secondFighterData["draws"]);
        } else {
            await fightersRepository.create(
                secondUser,
                secondFighterStars > firstFighterStars ? 1 : 0,
                secondFighterStars < firstFighterStars ? 1 : 0,
                secondFighterStars == firstFighterStars ? 1 : 0);
        }

        return {
            "winner": secondFighterStars > firstFighterStars ? secondUser : secondFighterStars == firstFighterStars ? null : firstUser,
            "loser": secondFighterStars < firstFighterStars ? secondUser : secondFighterStars == firstFighterStars ? null : firstUser,
            "draw": firstFighterStars == secondFighterStars
        };
    } catch (error) {
        console.log(error);
        throw "Error";
    }
}