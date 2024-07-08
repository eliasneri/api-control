import { Request, Response } from 'express';
import {dotEnv} from "../../utils/dotenv";
import {apiStartServer, healtCheck} from '../../server'
import {DurationDate} from "../interfaces/interfacesGenerics";
import {getDurationBetweenDates} from "../../utils/dateUtils";

export const getHealtCheck = async (req: Request, res: Response): Promise<void> => {
    const hc = healtCheck.getHC();
    const nowDate: Date = new Date();
    const duration: DurationDate = getDurationBetweenDates(apiStartServer, nowDate);
    res.status(200).json({
        statusAPI: "ok",
        startedAPIOn: apiStartServer,
        portAPI: dotEnv.parsed.API_PORT,
        onAIR: duration.hours + "h:" + duration.minutes,
        databases: hc

    });
};