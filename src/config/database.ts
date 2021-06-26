import { createPool } from 'mysql2/promise';
import * as dotenv from "dotenv";

export async function connect()
{
    dotenv.config();

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'landowolf10',
        database: 'notes',
        connectionLimit: 10
    });

    return connection;
}