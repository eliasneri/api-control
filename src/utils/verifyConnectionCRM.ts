import {connectionCRM, knexCRM} from "../core/config/databaseCRMConfig";

export async function verifyConnectionCRM() {
    try {
        const isConnected = await connectionCRM();
        if (!isConnected) {
            console.log('Não foi possível conectar ao banco de dados CRM.');
            return;
        }
        console.log('Conectado com Database: ', knexCRM.context.client.connectionSettings.database);

    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
    }
}

// Chamada para iniciar a aplicação
