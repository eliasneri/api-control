import express from 'express'
import { connectionCRM } from './core/config/databaseCRMConfig'
import { connectionFLW } from './core/config/databaseFLWConfig'
import * as process from "node:process";
import { HealtCheck } from "./core/class/HealtCheck";
import crmRoutes from "./routes/crmRoutes";
import apiRoutes from "./routes/apiRoutes";
import flwRoutes from "./routes/flwRoutes";
import {verifyConnectionCRM} from "./utils/verifyConnectionCRM";
import {verifyConnectionFLW} from "./utils/verifyConnectionFLW";
import bodyParser from "body-parser";
require('dotenv').config({ path: ".env" });

const cors = require("cors");
let healtCheck: HealtCheck;
let apiStartServer: Date;


async function checkDbCRM(): Promise<boolean> {
    try{
        return await connectionCRM();
    } catch (error) {
        return false;
    }
}

async function checkDbFLW(): Promise<boolean> {
    try{
        return await connectionFLW();
    } catch (error) {
        return false;
    }
}

const app = express();
const apiPath: string = "/api/v1"

app.use(express.json());
app.use(cors());
app.use(apiPath, crmRoutes);
app.use(apiPath, apiRoutes);
app.use(apiPath, flwRoutes);


async function startServer() {
    try {
        const dbCrmOk: boolean = await checkDbCRM();
        const dbFLWOk: boolean = await checkDbFLW();
        healtCheck = new HealtCheck(dbCrmOk, dbFLWOk);
    } catch (error) {
        console.error(error);
    }

    // Inicia o Servidor, independente das conexões

    app.listen(process.env.API_PORT,
        () => console.log(`Started on port ${process.env.API_PORT}`))

    apiStartServer = new Date();
}

startServer();
verifyConnectionCRM();
verifyConnectionFLW();
export { healtCheck, apiStartServer };
