import { Request, Response } from 'express';
import {Company, User} from "../interfaces/interfacesGenerics";
import {flwService} from "../service/flwService";
import {CnpjValidations} from "../service/validations/cnpjValidations";

export const newCompany = async (req: Request, res: Response) => {
    try {
        const newCompany: Company = req.body;
        const newUser: User = await flwService.newCompany(newCompany);
        return res.status(200).json({user: newUser});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

export const getCnpjCompany = async (req: Request, res: Response)=> {
    const cnpj = req.params.id
    try {
        const existCnpj: boolean = await CnpjValidations.findByCnpj(cnpj);
        return res.status(200).json({cnpj: cnpj, companyExists: existCnpj});
    } catch (error){
        return res.status(500).json({message: error});
    }
}

export const getTestFLW = async (req: Request, res: Response) => {
    return res.status(200).json({message:"success"});
}