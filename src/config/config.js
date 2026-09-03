import { config } from "dotenv";
import path from 'path'

config({ path: path.resolve(`./src/config/.env.${process.env.NODE_ENV}`) })
export const secrets = {
    port: process.env.PORT,
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD
}