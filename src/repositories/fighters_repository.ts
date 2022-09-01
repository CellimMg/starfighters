import connection from "../database/postgres";

export async function create(username: string, wins: number, losses: number, draws: number): Promise<void> {
    try {
        await connection.query(`
            INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4);
        `, [username, wins, losses, draws]);
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED";
    }
}

export async function read(): Promise<any[]> {
    try {
        const { rows } = await connection.query(`
            SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC, draws DESC;
        `);
        return rows;
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED";
    }
}

export async function readByUserName(userName: string): Promise<{ [x: string]: number }> {
    try {
        const { rows } = await connection.query(`
            SELECT * FROM fighters WHERE username = $1;
        `, [userName]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED";
    }
}

export async function update(username: string, wins: number, losses: number, draws: number): Promise<void> {
    try {
        await connection.query(`
            UPDATE fighters SET wins=$1, losses=$2, draws=$3 WHERE username = $4;
        `, [wins, losses, draws, username]);
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED";
    }
}
