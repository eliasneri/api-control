import {knexCRM} from "../config/databaseCRMConfig";
import {CheckCompany} from '../interfaces/interfacesGenerics';
import {Product} from "../enum/product";
import {CompanyValidations} from "./validations/companyValidations";



export class crmService {

    static companyAvailable = async (idCompany : number | string) => {
        const checkCompany: CheckCompany = await CompanyValidations.validateCompany(idCompany)
        return checkCompany;
    }

}