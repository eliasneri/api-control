import {connectionFLW, knexFLW} from "../core/config/databaseFLWConfig";
import {knexCRM} from "../core/config/databaseCRMConfig";

export async function verifyConnectionFLW() {
    try {
        const isConnected = await connectionFLW();
        if (!isConnected) {
            console.log('Não foi possível conectar ao banco de dados FAST FLOW. Verifique as configurações.');
            return;
        }
        console.log('Conectado com Database: ', knexFLW.context.client.connectionSettings.database);

    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
    }
}

// Chamada para iniciar a aplicação
