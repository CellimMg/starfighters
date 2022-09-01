import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connection: Pool = new Pool(
    {
        connectionString: `${process.env.CONNECTION_STRING}`
    }
);


export default connection;