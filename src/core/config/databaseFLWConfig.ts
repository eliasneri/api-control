import knexRoot, {Knex} from "knex";
import {dotEnv} from "../../utils/dotenv";

const knexFLW : any  = knexRoot({
    client: "pg",
        connection: {
            host: dotEnv.parsed.FLW_DB_HOST,
            port: dotEnv.parsed.FLW_DB_PORT,
            user: dotEnv.parsed.FLW_DB_USER,
            password: dotEnv.parsed.FLW_DB_PASS,
            database: dotEnv.parsed.FLW_DB_NAME
        }
})

async function connectionFLW(): Promise<boolean> {
    try {
        await knexFLW.raw('SELECT 1');
        return true;
    } catch (error){
        console.error(error)
        return false;
    }
}
export {knexFLW, connectionFLW };