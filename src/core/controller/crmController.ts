import { Request, Response } from 'express';
import {crmService} from "../service/crmService";
import {CheckCompany} from "../interfaces/interfacesGenerics";

export const getCheckCompany = async (req: Request, res: Response) => {
    const id = req.params.id
    const checkCompany: CheckCompany = await crmService.companyAvailable(id);
    res.status(checkCompany.status)
        .json({
            checkCompany
        })
}

