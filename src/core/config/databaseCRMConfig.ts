import knexRoot, {Knex} from "knex";
import {dotEnv} from "../../utils/dotenv";

const knexCRM : any  = knexRoot({
    client: "pg",
    connection: {
        host: dotEnv.parsed.CRM_DB_HOST,
        port: dotEnv.parsed.CRM_DB_PORT,
        user: dotEnv.parsed.CRM_DB_USER,
        password: dotEnv.parsed.CRM_DB_PASS,
        database: dotEnv.parsed.CRM_DB_NAME,
    }
})

async function connectionCRM(): Promise<boolean> {
    try {
        await knexCRM.raw('SELECT 1');
        return true;
    } catch (error){
        console.error(error)
        return false;
    }
}
export {knexCRM, connectionCRM };