import {CheckCompany, Company} from "../../interfaces/interfacesGenerics";
import {knexCRM} from "../../config/databaseCRMConfig";
import {Product} from "../../enum/product";

export class CompanyValidations {

    static async validateCompany(idCompany : number | string): Promise<CheckCompany> {

        let check: CheckCompany = {
            status: 404,
            id_inCRM: 0,
            name_company: "",
            contracted_logins: 0,
            company_available: false,
            product_available: false,
            company_product_expired: null
        };

        try {
            const result = await knexCRM.select(
                'c.company_id as id_inCRM',
                'c.company_name as name_company',
                'cp.company_product_amount as contracted_logins',
                'c.company_isActive as company_available',
                'cp.company_product_isActive as product_available',
                'cp.company_product_expired as company_product_expired'
            )
                .from('companies as c')
                .leftJoin('company_products as cp', 'cp.company_product_fk_company_id', 'c.company_id')
                .where('c.company_id', idCompany)
                .andWhere('cp.company_product_fk_product_id', Product.PRODUCTION)
                .first();

            if (result) {
                check = result;
                check.status = (check.id_inCRM !== undefined) ? 200 : 404;
            } else {
                check.name_company = "não encontrado";
            }

        } catch (error) {
            console.error(error);
            check.status = 500;
        }

        return check;
    }
}