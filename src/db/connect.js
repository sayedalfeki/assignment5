import { Sequelize } from "sequelize";
import { secrets } from "../config/config.js";


// @ts-ignore
const sequelize = new Sequelize(secrets.database, secrets.user, secrets.password,
    {
        host: secrets.host,
        dialect: 'mysql',

    }
)
let dbConnect = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('connected successfully to database');

    } catch (error) {
        // @ts-ignore
        throw new Error(error.message);



    }
}
export {
    sequelize, dbConnect
}