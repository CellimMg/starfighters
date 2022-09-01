import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import battleRoute from "./routes/battles_route";
import rankingRoute from "./routes/ranking_route";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(battleRoute);
server.use(rankingRoute);

server.listen(process.env.PORT || 5000, () => {
    console.log("Server is running at " + process.env.PORT);
});